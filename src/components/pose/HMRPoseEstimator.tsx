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

export default function HMRPoseEstimator({ imageUrl, width = 300, height = 300 }: HMRPoseEstimatorProps) {
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
        await tf.ready();
        const model = poseDetection.SupportedModels.BlazePose;
        const detectorConfig = {
          runtime: 'tfjs',
          enableSmoothing: true,
          modelType: 'full'
        };
        
        const detector = await poseDetection.createDetector(model, detectorConfig);
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
    scene.background = new THREE.Color(0xf5f5f5);

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 1.5, 3);
    camera.lookAt(0, 1, 0);

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Controls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // 바닥 그리드 추가
    const gridHelper = new THREE.GridHelper(4, 10, 0xcccccc, 0xcccccc);
    scene.add(gridHelper);

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
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // 이미지 전처리
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context를 생성할 수 없습니다.');

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 자세 추정
        const poses = await detectorRef.current.estimatePoses(canvas, {
          flipHorizontal: false
        });

        if (poses.length === 0) {
          throw new Error('자세를 감지할 수 없습니다.');
        }

        const pose = poses[0];
        if (!pose.keypoints3D) {
          throw new Error('3D 키포인트를 추정할 수 없습니다.');
        }

        // 3D 메시 업데이트
        updateMesh(pose.keypoints3D);

      } catch (error) {
        console.error('이미지 분석 실패:', error);
        setError(error instanceof Error ? error.message : '이미지 분석에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    analyzeImage();
  }, [imageUrl, width, height]);

  // 3D 메시 업데이트
  const updateMesh = (keypoints3D: Keypoint3D[]) => {
    if (!meshRef.current) return;

    // 기존 메시 제거
    while (meshRef.current.children.length) {
      const object = meshRef.current.children[0];
      meshRef.current.remove(object);
    }

    // 키포인트 그리기
    keypoints3D.forEach((keypoint) => {
      if (keypoint.score && keypoint.score > 0.3) {
        const geometry = new THREE.SphereGeometry(0.03, 16, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        
        // 좌표계 변환 및 스케일 조정
        sphere.position.set(
          keypoint.x,
          -keypoint.y,
          -keypoint.z
        );
        
        meshRef.current?.add(sphere);
      }
    });

    // 연결선 그리기
    const connections = [
      [11, 12], // 어깨
      [12, 14], // 오른쪽 어깨-팔꿈치
      [14, 16], // 오른쪽 팔꿈치-손목
      [11, 13], // 왼쪽 어깨-팔꿈치
      [13, 15], // 왼쪽 팔꿈치-손목
      [12, 24], // 오른쪽 어깨-엉덩이
      [11, 23], // 왼쪽 어깨-엉덩이
      [23, 24], // 엉덩이
      [23, 25], // 왼쪽 엉덩이-무릎
      [25, 27], // 왼쪽 무릎-발목
      [24, 26], // 오른쪽 엉덩이-무릎
      [26, 28]  // 오른쪽 무릎-발목
    ];

    connections.forEach(([startIdx, endIdx]) => {
      const startPoint = keypoints3D[startIdx];
      const endPoint = keypoints3D[endIdx];
      
      if (startPoint && endPoint && startPoint.score && endPoint.score && 
          startPoint.score > 0.3 && endPoint.score > 0.3) {
        const points = [
          new THREE.Vector3(startPoint.x, -startPoint.y, -startPoint.z),
          new THREE.Vector3(endPoint.x, -endPoint.y, -endPoint.z)
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const line = new THREE.Line(geometry, material);
        meshRef.current?.add(line);
      }
    });
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="rounded-lg overflow-hidden bg-gray-50"
        style={{ width, height }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="mt-2">3D 자세 분석 중...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-white text-center p-4">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
} 