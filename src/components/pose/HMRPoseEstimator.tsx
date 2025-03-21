import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as poseDetection from '@tensorflow-models/pose-detection';

interface HMRPoseEstimatorProps {
  imageUrl?: string;
  width?: number;
  height?: number;
}

interface Keypoint3D {
  x: number;
  y: number;
  z: number;
  score?: number;
  name?: string;
}

export default function HMRPoseEstimator({ imageUrl, width = 640, height = 480 }: HMRPoseEstimatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);

  // MediaPipe Pose Detector 초기화
  useEffect(() => {
    const initDetector = async () => {
      try {
        const model = poseDetection.SupportedModels.MediaPipePose;
        const detectorConfig = {
          runtime: 'tfjs',
          modelType: 'full',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
          enableSmoothing: true,
          minDetectionConfidence: 0.1,
          minTrackingConfidence: 0.1,
          minPoseScore: 0.1,
          maxPoses: 1,
          refineLandmarks: true,
          smoothLandmarks: true,
        };
        
        const detector = await poseDetection.createDetector(
          model,
          detectorConfig
        );
        detectorRef.current = detector;
      } catch (error) {
        console.error('Pose detector 초기화 실패:', error);
        setError('자세 추정 모델을 초기화할 수 없습니다.');
      }
    };

    initDetector();
  }, []);

  // Three.js 초기화
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene 설정
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 0, 5);

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Controls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // 메시 그룹 생성
    const mesh = new THREE.Group();
    meshRef.current = mesh;
    scene.add(mesh);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 클린업
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [width, height]);

  // 이미지 분석
  useEffect(() => {
    const analyzeImage = async () => {
      if (!imageUrl || !detectorRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        // 이미지 로드
        const img = new Image();
        img.src = imageUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // 이미지 전처리
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context를 생성할 수 없습니다.');

        // 이미지 크기 조정
        canvas.width = 640;
        canvas.height = 480;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 자세 추정
        const poses = await detectorRef.current.estimatePoses(canvas);
        if (poses.length === 0) {
          throw new Error('자세를 감지할 수 없습니다.');
        }

        const pose = poses[0];
        if (!pose.keypoints3D) {
          throw new Error('3D 키포인트를 추정할 수 없습니다.');
        }

        // Keypoint3D 배열로 변환
        const keypoints3D: Keypoint3D[] = pose.keypoints3D.map(kp => ({
          x: kp.x,
          y: kp.y,
          z: kp.z || 0,
          score: kp.score,
          name: kp.name
        }));

        updateMesh(keypoints3D);

      } catch (error) {
        console.error('이미지 분석 실패:', error);
        setError(error instanceof Error ? error.message : '이미지 분석에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    analyzeImage();
  }, [imageUrl]);

  // 3D 메시 업데이트
  const updateMesh = (keypoints3D: Keypoint3D[]) => {
    if (!meshRef.current) return;

    // 기존 메시 제거
    meshRef.current.clear();

    // 새로운 메시 생성
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(keypoints3D.length * 3);
    const indices: number[] = [];

    // 키포인트를 vertices로 변환
    keypoints3D.forEach((keypoint, i) => {
      vertices[i * 3] = keypoint.x;
      vertices[i * 3 + 1] = keypoint.y;
      vertices[i * 3 + 2] = keypoint.z;
    });

    // 연결된 키포인트를 indices로 변환
    const connections = [
      // 몸통
      [11, 12], // 어깨
      [12, 24], // 오른쪽 어깨-엉덩이
      [24, 23], // 엉덩이
      [23, 11], // 왼쪽 어깨-엉덩이

      // 왼쪽 팔
      [11, 13], // 어깨-팔꿈치
      [13, 15], // 팔꿈치-손목

      // 오른쪽 팔
      [12, 14], // 어깨-팔꿈치
      [14, 16], // 팔꿈치-손목

      // 왼쪽 다리
      [23, 25], // 엉덩이-무릎
      [25, 27], // 무릎-발목

      // 오른쪽 다리
      [24, 26], // 엉덩이-무릎
      [26, 28], // 무릎-발목
    ];

    connections.forEach(([start, end]) => {
      indices.push(start, end);
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.LineSegments(geometry, material);
    meshRef.current.add(mesh);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="mt-2">3D 자세 분석 중...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="rounded-lg overflow-hidden" />
    </div>
  );
} 