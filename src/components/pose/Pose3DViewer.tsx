import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Keypoint } from '@tensorflow-models/pose-detection';

interface Pose3DViewerProps {
  keypoints: Keypoint[];
  width?: number;
  height?: number;
}

export default function Pose3DViewer({ keypoints, width = 640, height = 480 }: Pose3DViewerProps) {
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

  // 키포인트 업데이트
  useEffect(() => {
    if (!meshRef.current || !keypoints.length) return;

    // 기존 메시 제거
    meshRef.current.clear();

    // 새로운 메시 생성
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(keypoints.length * 3);
    const indices: number[] = [];

    // 키포인트를 vertices로 변환
    keypoints.forEach((keypoint, i) => {
      vertices[i * 3] = keypoint.x;
      vertices[i * 3 + 1] = keypoint.y;
      vertices[i * 3 + 2] = keypoint.z || 0;
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
  }, [keypoints]);

  return (
    <div ref={containerRef} className="rounded-lg overflow-hidden" />
  );
} 