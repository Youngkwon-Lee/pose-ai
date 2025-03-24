import { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import Pose3DViewer from './Pose3DViewer';

interface Pose3DEstimatorProps {
  imageUrl?: string;
  width?: number;
  height?: number;
}

export default function Pose3DEstimator({ imageUrl, width = 640, height = 480 }: Pose3DEstimatorProps) {
  const [keypoints, setKeypoints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const initPoseDetection = async () => {
      // TensorFlow.js 백엔드 초기화
      await tf.setBackend('webgl');
      
      // 모델 설정
      const model = poseDetection.SupportedModels.BlazePose;
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'full',
        enableSmoothing: true,
      };
      
      const detector = await poseDetection.createDetector(
        model,
        detectorConfig
      );

      return detector;
    };

    initPoseDetection().catch(console.error);
  }, []);

  const estimatePose = async (image: HTMLImageElement) => {
    setIsLoading(true);
    try {
      const model = poseDetection.SupportedModels.BlazePose;
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'full',
        enableSmoothing: true,
      };
      
      const detector = await poseDetection.createDetector(
        model,
        detectorConfig
      );

      const poses = await detector.estimatePoses(image);
      
      if (poses.length > 0) {
        const pose = poses[0];
        const keypoints3D = pose.keypoints3D || pose.keypoints.map(kp => ({
          ...kp,
          z: 0 // 2D 키포인트의 경우 z 좌표는 0으로 설정
        }));
        
        setKeypoints(keypoints3D);
      }
    } catch (error) {
      console.error('자세 추정 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageUrl && imageRef.current) {
      const img = imageRef.current;
      img.onload = () => {
        estimatePose(img);
      };
    }
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrl && (
        <img
          ref={imageRef}
          src={imageUrl}
          alt="자세 분석 이미지"
          className="rounded-lg"
          style={{ width, height: 'auto' }}
        />
      )}
      
      {isLoading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">자세 분석 중...</p>
        </div>
      )}

      {keypoints.length > 0 && (
        <div className="w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">3D 자세 시각화</h3>
          <Pose3DViewer keypoints={keypoints} width={width} height={height} />
        </div>
      )}
    </div>
  );
} 