"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Upload, RefreshCw, Info, Share2, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Pose3DViewer from '@/components/pose/Pose3DViewer';
import HMRPoseEstimator from '@/components/pose/HMRPoseEstimator';
import Webcam from "react-webcam";

// Component for the analysis
const PoseAnalysisComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showKeypoints, setShowKeypoints] = useState(false);
  const [keypointImage, setKeypointImage] = useState<string | null>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<any>(null);

  // Initialize TensorFlow and pose detector
  useEffect(() => {
    const initPoseDetector = async () => {
      try {
        console.log('TensorFlow 초기화 시작');
        await tf.ready();
        console.log('TensorFlow 초기화 완료');

        console.log('포즈 감지 모델 로딩 시작');
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        };
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );
        console.log('포즈 감지 모델 로딩 완료');
        setDetector(detector);
        toast.success('AI 모델이 성공적으로 로드되었습니다!');
      } catch (error) {
        console.error('포즈 감지 모델 초기화 오류:', error);
        toast.error('AI 모델 로드에 실패했습니다. 페이지를 새로고침해주세요.');
      }
    };

    initPoseDetector();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const calculateAlignmentScore = (keypoints: any[]) => {
    let totalScore = 0;
    let measurements = 0;

    // 어깨 정렬 검사
    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');
    if (leftShoulder && rightShoulder) {
      const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
      const shoulderScore = Math.max(0, 100 - (shoulderDiff * 2));
      totalScore += shoulderScore;
      measurements++;
    }

    // 골반 정렬 검사
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    const rightHip = keypoints.find(kp => kp.name === 'right_hip');
    if (leftHip && rightHip) {
      const hipDiff = Math.abs(leftHip.y - rightHip.y);
      const hipScore = Math.max(0, 100 - (hipDiff * 2));
      totalScore += hipScore;
      measurements++;
    }

    // 목 자세 검사
    const nose = keypoints.find(kp => kp.name === 'nose');
    const leftEar = keypoints.find(kp => kp.name === 'left_ear');
    const rightEar = keypoints.find(kp => kp.name === 'right_ear');
    if (nose && leftEar && rightEar) {
      const earDiff = Math.abs(leftEar.y - rightEar.y);
      const neckScore = Math.max(0, 100 - (earDiff * 3));
      totalScore += neckScore;
      measurements++;
    }

    return measurements > 0 ? Math.round(totalScore / measurements) : 0;
  };

  const calculateAngle = (point1: any, point2: any, point3: any) => {
    if (!point1 || !point2 || !point3) return null;
    
    const radians = Math.atan2(point3.y - point2.y, point3.x - point2.x) - 
                   Math.atan2(point1.y - point2.y, point1.x - point2.x);
    let degrees = Math.abs(radians * 180.0 / Math.PI);
    
    // 각도를 0-90도 범위로 정규화
    if (degrees > 90) {
      degrees = 180 - degrees;
    }
    
    return Math.round(degrees);
  };

  const drawKeypoints = (keypoints: any[], canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 키포인트 연결 정의
    const connections = [
      // 상체 (Upper Body)
      ['left_shoulder', 'right_shoulder'],
      ['left_shoulder', 'left_elbow'],
      ['right_shoulder', 'right_elbow'],
      ['left_elbow', 'left_wrist'],
      ['right_elbow', 'right_wrist'],
      
      // 몸통 (Torso)
      ['left_shoulder', 'left_hip'],
      ['right_shoulder', 'right_hip'],
      ['left_hip', 'right_hip'],
      
      // 하체 (Lower Body)
      ['left_hip', 'left_knee'],
      ['right_hip', 'right_knee'],
      ['left_knee', 'left_ankle'],
      ['right_knee', 'right_ankle'],
      
      // 발 (Feet)
      ['left_ankle', 'left_heel'],
      ['right_ankle', 'right_heel'],
      ['left_heel', 'left_foot_index'],
      ['right_heel', 'right_foot_index']
    ];

    // 연결선 그리기
    connections.forEach(([start, end]) => {
      const startPoint = keypoints.find(kp => kp.name === start);
      const endPoint = keypoints.find(kp => kp.name === end);
      
      if (startPoint && endPoint && startPoint.score > 0.3 && endPoint.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        
        // 부위별 다른 색상 적용
        if (start.includes('shoulder') || end.includes('shoulder')) {
          ctx.strokeStyle = '#FF6B6B'; // 어깨 - 빨간색
        } else if (start.includes('hip') || end.includes('hip')) {
          ctx.strokeStyle = '#4ECDC4'; // 골반 - 청록색
        } else if (start.includes('knee') || end.includes('knee')) {
          ctx.strokeStyle = '#45B7D1'; // 무릎 - 파란색
        } else if (start.includes('ankle') || end.includes('ankle')) {
          ctx.strokeStyle = '#96CEB4'; // 발목 - 연두색
        } else if (start.includes('elbow') || end.includes('elbow')) {
          ctx.strokeStyle = '#FFEEAD'; // 팔꿈치 - 노란색
        } else if (start.includes('wrist') || end.includes('wrist')) {
          ctx.strokeStyle = '#D4A5A5'; // 손목 - 분홍색
        } else {
          ctx.strokeStyle = '#e1f299'; // 기본 - 연한 초록색
        }
        
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // 키포인트 그리기
    keypoints.forEach(keypoint => {
      if (keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
        
        // 부위별 다른 색상 적용
        if (keypoint.name.includes('shoulder')) {
          ctx.fillStyle = '#FF6B6B'; // 어깨 - 빨간색
        } else if (keypoint.name.includes('hip')) {
          ctx.fillStyle = '#4ECDC4'; // 골반 - 청록색
        } else if (keypoint.name.includes('knee')) {
          ctx.fillStyle = '#45B7D1'; // 무릎 - 파란색
        } else if (keypoint.name.includes('ankle')) {
          ctx.fillStyle = '#96CEB4'; // 발목 - 연두색
        } else if (keypoint.name.includes('elbow')) {
          ctx.fillStyle = '#FFEEAD'; // 팔꿈치 - 노란색
        } else if (keypoint.name.includes('wrist')) {
          ctx.fillStyle = '#D4A5A5'; // 손목 - 분홍색
        } else {
          ctx.fillStyle = '#dcf837'; // 기본 - 노란색
        }
        
        ctx.fill();
      }
    });

    // 정렬 상태 표시
    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    const rightHip = keypoints.find(kp => kp.name === 'right_hip');
    const leftKnee = keypoints.find(kp => kp.name === 'left_knee');
    const rightKnee = keypoints.find(kp => kp.name === 'right_knee');
    const leftAnkle = keypoints.find(kp => kp.name === 'left_ankle');
    const rightAnkle = keypoints.find(kp => kp.name === 'right_ankle');

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      // 어깨 정렬선
      ctx.beginPath();
      ctx.moveTo(leftShoulder.x, leftShoulder.y);
      ctx.lineTo(rightShoulder.x, rightShoulder.y);
      ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 골반 정렬선
      ctx.beginPath();
      ctx.moveTo(leftHip.x, leftHip.y);
      ctx.lineTo(rightHip.x, rightHip.y);
      ctx.strokeStyle = 'rgba(78, 205, 196, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 무릎 정렬선
      if (leftKnee && rightKnee) {
        ctx.beginPath();
        ctx.moveTo(leftKnee.x, leftKnee.y);
        ctx.lineTo(rightKnee.x, rightKnee.y);
        ctx.strokeStyle = 'rgba(69, 183, 209, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 발목 정렬선
      if (leftAnkle && rightAnkle) {
        ctx.beginPath();
        ctx.moveTo(leftAnkle.x, leftAnkle.y);
        ctx.lineTo(rightAnkle.x, rightAnkle.y);
        ctx.strokeStyle = 'rgba(150, 206, 180, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  };

  const validateKeypoints = (keypoints: any[]) => {
    // 필수 키포인트 목록
    const requiredKeypoints = [
      'nose',
      'left_shoulder',
      'right_shoulder',
      'left_hip',
      'right_hip',
      'left_knee',
      'right_knee',
      'left_ankle',
      'right_ankle'
    ];

    // 필수 키포인트가 모두 있는지 확인
    const missingKeypoints = requiredKeypoints.filter(keypoint => 
      !keypoints.find(kp => kp.name === keypoint && kp.score > 0.3)
    );

    if (missingKeypoints.length > 0) {
      return {
        isValid: false,
        message: `다음 부위가 보이지 않습니다: ${missingKeypoints.join(', ')}. 다시 찍어주세요.`
      };
    }

    return { isValid: true };
  };

  const analyzePose = async () => {
    if (!selectedFile || !detector || !canvasRef.current) {
      console.log('초기 조건 체크 실패:', { 
        hasFile: !!selectedFile, 
        hasDetector: !!detector, 
        hasCanvas: !!canvasRef.current 
      });
      if (!detector) {
        toast.error('AI 모델이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      }
      return;
    }

    setIsAnalyzing(true);
    setIsLoading(true);

    try {
      console.log('이미지 로딩 시작');
      const img = new Image();
      img.src = previewUrl!;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = (e) => {
          console.error('이미지 로딩 실패:', e);
          reject(new Error('이미지를 로드할 수 없습니다.'));
        };
      });
      console.log('이미지 로딩 완료');

      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('캔버스 컨텍스트를 가져올 수 없습니다');
      }
      ctx.drawImage(img, 0, 0);
      console.log('이미지를 캔버스에 그리기 완료');

      console.log('포즈 감지 시작');
      const poses = await detector.estimatePoses(img);
      console.log('포즈 감지 완료:', poses);
      
      if (poses.length === 0) {
        console.log('포즈가 감지되지 않음');
        toast.error('이미지에서 자세를 감지할 수 없습니다');
        setIsLoading(false);
        setIsAnalyzing(false);
        return;
      }

      const pose = poses[0];
      const keypoints = pose.keypoints;

      // 키포인트 검증
      const validation = validateKeypoints(keypoints);
      if (!validation.isValid) {
        toast.error(validation.message);
        return;
      }
      
      // 키포인트 시각화
      drawKeypoints(keypoints, canvas);
      setKeypointImage(canvas.toDataURL());
      setShowKeypoints(true);
      
      // 정렬 점수 계산
      const alignmentScore = calculateAlignmentScore(keypoints);
      
      // 자세 분석 결과 생성
      const results = {
        posture: {
          score: alignmentScore,
          issues: [] as string[],
          improvements: [] as string[],
          solutions: [] as Array<{
            title: string;
            description: string;
            exercises: string[];
          }>,
          angles: {
            shoulders: 0,
            hips: 0,
            neck: 0
          }
        },
        alignment: {
          score: alignmentScore,
          details: "",
          tips: [] as string[]
        },
        keypoints: keypoints
      };

      // 어깨 각도 계산
      const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
      const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');
      const leftHip = keypoints.find(kp => kp.name === 'left_hip');
      const rightHip = keypoints.find(kp => kp.name === 'right_hip');
      const nose = keypoints.find(kp => kp.name === 'nose');
      const leftEar = keypoints.find(kp => kp.name === 'left_ear');
      const rightEar = keypoints.find(kp => kp.name === 'right_ear');
      const leftKnee = keypoints.find(kp => kp.name === 'left_knee');
      const rightKnee = keypoints.find(kp => kp.name === 'right_knee');

      // 어깨 기울기 계산
      if (leftShoulder && rightShoulder) {
        const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
        const shoulderAngle = Math.round(Math.atan2(shoulderDiff, rightShoulder.x - leftShoulder.x) * 180 / Math.PI);
        const normalizedShoulderAngle = shoulderAngle > 90 ? 180 - shoulderAngle : shoulderAngle;
        results.posture.angles.shoulders = normalizedShoulderAngle;
        
        if (shoulderDiff > 0.1) {
          const higherSide = leftShoulder.y < rightShoulder.y ? '왼쪽' : '오른쪽';
          results.posture.issues.push(`${higherSide} 어깨가 ${normalizedShoulderAngle}도 높습니다`);
          results.posture.improvements.push(`${higherSide} 어깨를 ${normalizedShoulderAngle}도 낮추세요`);
          results.posture.solutions.push({
            title: "어깨 정렬 교정",
            description: `${higherSide} 어깨를 ${normalizedShoulderAngle}도 낮추어 수평을 맞추세요`,
            exercises: ["어깨 정렬 운동", "스트레칭"]
          });
        }
      }

      // 골반 기울기 계산
      if (leftHip && rightHip) {
        const hipDiff = Math.abs(leftHip.y - rightHip.y);
        const hipAngle = Math.round(Math.atan2(hipDiff, rightHip.x - leftHip.x) * 180 / Math.PI);
        const normalizedHipAngle = hipAngle > 90 ? 180 - hipAngle : hipAngle;
        results.posture.angles.hips = normalizedHipAngle;
        
        if (hipDiff > 0.1) {
          const higherSide = leftHip.y < rightHip.y ? '왼쪽' : '오른쪽';
          results.posture.issues.push(`${higherSide} 골반이 ${normalizedHipAngle}도 높습니다`);
          results.posture.improvements.push(`${higherSide} 골반을 ${normalizedHipAngle}도 낮추세요`);
          results.posture.solutions.push({
            title: "골반 정렬 교정",
            description: `${higherSide} 골반을 ${normalizedHipAngle}도 낮추어 수평을 맞추세요`,
            exercises: ["골반 정렬 운동", "코어 운동"]
          });
        }
      }

      // 목 기울기 계산
      if (nose && leftEar && rightEar) {
        const earDiff = Math.abs(leftEar.y - rightEar.y);
        const neckAngle = Math.round(Math.atan2(earDiff, rightEar.x - leftEar.x) * 180 / Math.PI);
        const normalizedNeckAngle = neckAngle > 90 ? 180 - neckAngle : neckAngle;
        results.posture.angles.neck = normalizedNeckAngle;
        
        if (earDiff > 0.1) {
          const higherSide = leftEar.y < rightEar.y ? '왼쪽' : '오른쪽';
          results.posture.issues.push(`${higherSide}으로 ${normalizedNeckAngle}도 목이 기울어져 있습니다`);
          results.posture.improvements.push(`목을 ${normalizedNeckAngle}도 바로 하세요`);
          results.posture.solutions.push({
            title: "목 자세 교정",
            description: `${higherSide}으로 기울어진 목을 ${normalizedNeckAngle}도 바로 하세요`,
            exercises: ["목 스트레칭", "자세 교정 운동"]
          });
        }
      }

      // 손목 길이 차이 계산
      const leftWrist = keypoints.find(kp => kp.name === 'left_wrist');
      const rightWrist = keypoints.find(kp => kp.name === 'right_wrist');

      if (leftWrist && rightWrist && leftShoulder && rightShoulder) {
        // 각 손목에서 어깨까지의 거리 계산
        const leftArmLength = Math.sqrt(
          Math.pow(leftWrist.x - leftShoulder.x, 2) + 
          Math.pow(leftWrist.y - leftShoulder.y, 2)
        );
        const rightArmLength = Math.sqrt(
          Math.pow(rightWrist.x - rightShoulder.x, 2) + 
          Math.pow(rightWrist.y - rightShoulder.y, 2)
        );

        // 길이 차이 계산 (픽셀 단위를 상대적 비율로 변환)
        const lengthDiff = Math.abs(leftArmLength - rightArmLength);
        const avgLength = (leftArmLength + rightArmLength) / 2;
        const diffPercentage = Math.round((lengthDiff / avgLength) * 100);

        if (diffPercentage > 5) {  // 5% 이상 차이나는 경우
          const longerSide = leftArmLength > rightArmLength ? '왼쪽' : '오른쪽';
          results.posture.issues.push(`${longerSide} 팔이 반대쪽보다 ${diffPercentage}% 더 깁니다`);
          results.posture.improvements.push(`어깨와 팔의 정렬을 확인하세요`);
          results.posture.solutions.push({
            title: "팔 길이 불균형 교정",
            description: `${longerSide} 팔이 더 길게 보이는 것은 어깨나 허리가 틀어져있을 수 있습니다`,
            exercises: ["어깨 교정 운동", "허리 스트레칭", "자세 교정"]
          });
        }
      }

      // 정렬 상세 정보
      if (alignmentScore >= 90) {
        results.alignment.details = "전반적으로 좋은 자세를 유지하고 있습니다";
        results.alignment.tips = ["현재 자세를 유지하세요"];
      } else if (alignmentScore >= 80) {
        results.alignment.details = "약간의 자세 교정이 필요합니다";
        results.alignment.tips = [
          "어깨를 뒤로 당기고 아래로 내리세요",
          "골반을 중립 위치로 유지하세요",
          "목을 곧게 유지하세요"
        ];
      } else {
        results.alignment.details = "자세 교정이 필요합니다";
        results.alignment.tips = [
          "전문가와 상담하세요",
          "정기적인 자세 교정 운동을 하세요",
          "일상생활에서 자세를 의식하세요"
        ];
      }

      setAnalysisResults(results);
    } catch (error) {
      console.error('자세 분석 중 오류 발생:', error);
      toast.error('자세 분석에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  // 자세 정렬 분석 함수
  const analyzePoseAlignment = (keypoints: any[]) => {
    // 어깨 키포인트
    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');
    
    // 엉덩이 키포인트
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    const rightHip = keypoints.find(kp => kp.name === 'right_hip');
    
    // 무릎 키포인트
    const leftKnee = keypoints.find(kp => kp.name === 'left_knee');
    const rightKnee = keypoints.find(kp => kp.name === 'right_knee');

    let issues = [];
    let score = 100;

    // 어깨 기울기 체크
    if (leftShoulder && rightShoulder && 
        leftShoulder.score > 0.3 && rightShoulder.score > 0.3) {
      const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
      if (shoulderDiff > 20) {
        issues.push('어깨가 기울어져 있습니다.');
        score -= 20;
      }
    }

    // 엉덩이 기울기 체크
    if (leftHip && rightHip && 
        leftHip.score > 0.3 && rightHip.score > 0.3) {
      const hipDiff = Math.abs(leftHip.y - rightHip.y);
      if (hipDiff > 15) {
        issues.push('골반이 기울어져 있습니다.');
        score -= 20;
      }
    }

    // 무릎 정렬 체크
    if (leftKnee && rightKnee && 
        leftKnee.score > 0.3 && rightKnee.score > 0.3) {
      const kneeDiff = Math.abs(leftKnee.y - rightKnee.y);
      if (kneeDiff > 15) {
        issues.push('무릎 높이가 불균형합니다.');
        score -= 20;
      }
    }

    return {
      score: Math.max(score, 0),
      issues,
      needsCorrection: score < 80
    };
  };

  const shareResults = () => {
    // In a real app, this would generate a shareable link or allow social sharing
    toast.success("Share link copied to clipboard!");
  };

  const takePhoto = async () => {
    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPreviewUrl(imageSrc);
      
      // Convert base64 to file
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const file = new File([blob], "webcam-photo.jpg", { type: "image/jpeg" });
      
      setSelectedFile(file);
      setShowCamera(false);
      setAnalysisResults(null);
    }
  };

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">Pose</span> Analysis
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          Upload an image to analyze posture and get detailed insights. Our AI will detect body positions and provide actionable feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-dark">Upload Image</h2>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-gray-medium hover:text-lime-bright transition-colors"
            >
              <Info size={20} />
            </button>
          </div>

          {showInfo && (
            <div className="bg-lime-pale p-4 rounded-md mb-4 text-sm text-gray-dark">
              <p className="mb-2"><strong>Tips for best results:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use good lighting conditions</li>
                <li>Ensure the full body is visible</li>
                <li>Take photos from front, side, or 45° angles</li>
                <li>Wear form-fitting clothing for accurate analysis</li>
              </ul>
              <button
                onClick={() => setShowInfo(false)}
                className="text-lime-bright hover:underline mt-2 flex items-center text-xs"
              >
                <X size={12} className="mr-1" /> Close
              </button>
            </div>
          )}

          {!previewUrl ? (
            <div
              className="border-2 border-dashed border-gray-lighter rounded-lg p-8 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-lime-pale rounded-full p-4">
                  <Upload className="h-8 w-8 text-lime-bright" />
                </div>
                <div>
                  <p className="text-gray-dark font-medium">Drag & drop image here</p>
                  <p className="text-gray-medium text-sm mt-1">or</p>
                </div>
                <button
                  onClick={triggerFileInput}
                  className="primary-button"
                >
                  Browse Files
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-medium">
                  Supports: JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {showKeypoints ? (
                <img
                  src={keypointImage || previewUrl}
                  alt="Pose Analysis"
                  className="w-full rounded-lg object-contain max-h-[400px]"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full rounded-lg object-contain max-h-[400px]"
                />
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setShowKeypoints(!showKeypoints)}
                  className="p-1 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
                  title={showKeypoints ? "Hide Keypoints" : "Show Keypoints"}
                >
                  <Camera size={18} className="text-gray-dark" />
                </button>
                <button
                  onClick={resetUpload}
                  className="p-1 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
                >
                  <X size={18} className="text-gray-dark" />
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={analyzePose}
                  disabled={isAnalyzing}
                  className="primary-button flex items-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Analyze Pose
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-dark font-medium">Other Input Options</h3>
              <ChevronDown size={16} className="text-gray-medium" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={takePhoto}
                className="w-full py-2 flex items-center justify-center border border-gray-lighter rounded-md text-sm text-gray-dark hover:bg-lime-pale"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </button>
              <button className="w-full py-2 flex items-center justify-center border border-gray-lighter rounded-md text-sm text-gray-dark hover:bg-lime-pale">
                <Upload className="w-4 h-4 mr-2" />
                From URL
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 order-1 lg:order-2">
          <h2 className="text-xl font-semibold text-gray-dark mb-4">분석 결과</h2>

          {!analysisResults ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-medium space-y-3">
              <div className="bg-lime-pale rounded-full p-5">
                <Camera className="h-10 w-10 text-lime-bright" />
              </div>
              <p>이미지를 업로드하고 "자세 분석" 버튼을 클릭하세요</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-dark">전체 점수</h3>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-semibold ${
                  analysisResults.posture.score >= 80 ? 'bg-lime-bright' : 'bg-red-100 text-red-500'
                }`}>
                  {analysisResults.posture.score}
                </div>
              </div>

              {analysisResults.posture.issues.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-2">발견된 문제점</h4>
                  <ul className="list-disc list-inside text-red-600 space-y-1">
                    {analysisResults.posture.issues.map((issue: string, index: number) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResults.posture.needsCorrection && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowExpertModal(true)}
                    className="w-full py-3 bg-lime-bright hover:bg-lime-bright/90 text-white rounded-lg font-medium transition-colors"
                  >
                    전문가와 상담하기
                  </button>
                  <p className="text-sm text-gray-medium mt-2 text-center">
                    자세 교정을 위해 전문가의 도움을 받아보세요
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center text-gray-dark mb-6">
          Common Use <span className="text-lime-bright">Cases</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Dance Technique",
              description: "Analyze dance poses to improve form and technique",
              link: "/use-cases/dance",
            },
            {
              title: "Fitness Form",
              description: "Ensure proper exercise form to prevent injuries",
              link: "/use-cases/fitness",
            },
            {
              title: "Physical Therapy",
              description: "Track posture improvements for rehabilitation",
              link: "/use-cases/therapy",
            },
          ].map((item, index) => (
            <div key={index} className="p-6 border border-gray-lighter rounded-lg hover:border-lime-bright transition">
              <h3 className="text-lg font-medium text-gray-dark mb-2">{item.title}</h3>
              <p className="text-gray-medium text-sm mb-4">{item.description}</p>
              <Link href={item.link} className="text-lime-bright text-sm hover:underline">
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />

      {showCamera ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-dark">Take Photo</h3>
              <button
                onClick={() => setShowCamera(false)}
                className="text-gray-medium hover:text-gray-dark"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-contain"
                mirrored={true}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user"
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={capturePhoto}
                className="primary-button"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 전문가 상담 모달 */}
      {showExpertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-dark">전문가 상담 신청</h3>
              <button
                onClick={() => setShowExpertModal(false)}
                className="text-gray-medium hover:text-gray-dark"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-lime-pale p-4 rounded-lg">
                <h4 className="font-medium text-gray-dark mb-2">전문가 상담 안내</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 1:1 맞춤 자세 교정 프로그램</li>
                  <li>• 전문 물리치료사의 정밀 분석</li>
                  <li>• 온라인/오프라인 상담 선택 가능</li>
                  <li>• 개인별 맞춤 운동 처방</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    window.open('https://calendly.com/your-expert', '_blank');
                    setShowExpertModal(false);
                  }}
                  className="py-3 bg-lime-bright hover:bg-lime-bright/90 text-white rounded-lg font-medium transition-colors"
                >
                  온라인 상담 예약
                </button>
                <button
                  onClick={() => {
                    window.location.href = 'tel:+82-1234-5678';
                    setShowExpertModal(false);
                  }}
                  className="py-3 border border-lime-bright text-lime-bright hover:bg-lime-pale rounded-lg font-medium transition-colors"
                >
                  전화 상담
                </button>
              </div>

              <p className="text-xs text-gray-medium text-center">
                * 상담 예약 시 분석된 자세 데이터가 전문가와 공유됩니다
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function UploadPage() {
  return <PoseAnalysisComponent />;
}
