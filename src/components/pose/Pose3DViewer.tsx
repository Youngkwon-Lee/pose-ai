import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Keypoint } from '@tensorflow-models/pose-detection';

interface Pose3DViewerProps {
  keypoints: Keypoint[];
  width?: number;
  height?: number;
}

export default function Pose3DViewer({ keypoints, width = 300, height = 300 }: Pose3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);

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

  // 키포인트 업데이트
  useEffect(() => {
    if (!meshRef.current || !keypoints || keypoints.length === 0) return;

    // 기존 메시 제거
    while (meshRef.current.children.length) {
      const object = meshRef.current.children[0];
      meshRef.current.remove(object);
    }

    // 키포인트 연결 정의
    const connections = [
      ['left_shoulder', 'right_shoulder'],
      ['left_shoulder', 'left_elbow'],
      ['left_elbow', 'left_wrist'],
      ['right_shoulder', 'right_elbow'],
      ['right_elbow', 'right_wrist'],
      ['left_shoulder', 'left_hip'],
      ['right_shoulder', 'right_hip'],
      ['left_hip', 'right_hip'],
      ['left_hip', 'left_knee'],
      ['left_knee', 'left_ankle'],
      ['right_hip', 'right_knee'],
      ['right_knee', 'right_ankle']
    ];

    // 키포인트 그리기
    keypoints.forEach((keypoint) => {
      if (keypoint.score && keypoint.score > 0.3) {
        const geometry = new THREE.SphereGeometry(0.03, 16, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        
        // 좌표계 변환
        sphere.position.set(
          (keypoint.x - width/2) / 100,
          -(keypoint.y - height/2) / 100,
          0
        );
        
        meshRef.current?.add(sphere);
      }
    });

    // 연결선 그리기
    connections.forEach(([start, end]) => {
      const startPoint = keypoints.find(kp => kp.name === start);
      const endPoint = keypoints.find(kp => kp.name === end);
      
      if (startPoint && endPoint && startPoint.score && endPoint.score && 
          startPoint.score > 0.3 && endPoint.score > 0.3) {
        const points = [
          new THREE.Vector3(
            (startPoint.x - width/2) / 100,
            -(startPoint.y - height/2) / 100,
            0
          ),
          new THREE.Vector3(
            (endPoint.x - width/2) / 100,
            -(endPoint.y - height/2) / 100,
            0
          )
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const line = new THREE.Line(geometry, material);
        meshRef.current?.add(line);
      }
    });
  }, [keypoints, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="rounded-lg overflow-hidden bg-gray-50"
      style={{ width, height }}
    />
  );
} 