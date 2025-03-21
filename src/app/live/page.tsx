"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { Camera, RefreshCw, Share2, Download, Settings } from "lucide-react";

export default function LivePosePage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadModel = async () => {
    try {
      // Load TensorFlow.js
      await tf.ready();

      // Load MoveNet model (one of the fastest pose estimation models)
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };

      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );

      setDetector(detector);
      setIsModelLoading(false);
      toast.success("AI model loaded successfully!");
    } catch (error) {
      console.error("Error loading model:", error);
      toast.error("Failed to load AI model. Please refresh the page.");
    }
  };

  const enableCamera = async () => {
    setCameraEnabled(true);
  };

  const startPoseDetection = async () => {
    if (!detector || !webcamRef.current || !canvasRef.current) return;

    setIsDetecting(true);
    detectPose();
  };

  const detectPose = async () => {
    if (!isDetecting || !detector || !webcamRef.current || !canvasRef.current) return;

    const webcam = webcamRef.current;
    const canvas = canvasRef.current;

    // Check if webcam is ready
    if (webcam.video && webcam.video.readyState === 4) {
      const video = webcam.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set canvas dimensions to match video
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      try {
        // Detect poses
        const poses = await detector.estimatePoses(video);

        // Draw results
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawResults(poses, ctx, videoWidth, videoHeight);
          analyzePoseAndGiveFeedback(poses);
        }
      } catch (error) {
        console.error("Error during pose detection:", error);
      }
    }

    // Continue detection loop
    if (isDetecting) {
      requestAnimationFrame(detectPose);
    }
  };

  const drawResults = (
    poses: poseDetection.Pose[],
    ctx: CanvasRenderingContext2D,
    videoWidth: number,
    videoHeight: number
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, videoWidth, videoHeight);

    // Draw pose landmarks and connections
    poses.forEach((pose) => {
      // Draw keypoints
      if (pose.keypoints) {
        pose.keypoints.forEach((keypoint) => {
          // If keypoint confidence is high enough
          if (keypoint.score && keypoint.score > 0.3) {
            ctx.beginPath();
            ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#dcf837'; // Lime color
            ctx.fill();
          }
        });
      }

      // Define connections between keypoints for stick figure
      const connections = [
        // Torso
        ['left_shoulder', 'right_shoulder'],
        ['left_shoulder', 'left_hip'],
        ['right_shoulder', 'right_hip'],
        ['left_hip', 'right_hip'],
        // Arms
        ['left_shoulder', 'left_elbow'],
        ['left_elbow', 'left_wrist'],
        ['right_shoulder', 'right_elbow'],
        ['right_elbow', 'right_wrist'],
        // Legs
        ['left_hip', 'left_knee'],
        ['left_knee', 'left_ankle'],
        ['right_hip', 'right_knee'],
        ['right_knee', 'right_ankle'],
      ];

      // Draw connections
      if (pose.keypoints) {
        const keypointMap = new Map();
        pose.keypoints.forEach((keypoint) => {
          keypointMap.set(keypoint.name, keypoint);
        });

        connections.forEach(([start, end]) => {
          const startKeypoint = keypointMap.get(start);
          const endKeypoint = keypointMap.get(end);

          if (
            startKeypoint &&
            endKeypoint &&
            startKeypoint.score &&
            endKeypoint.score &&
            startKeypoint.score > 0.3 &&
            endKeypoint.score > 0.3
          ) {
            ctx.beginPath();
            ctx.moveTo(startKeypoint.x, startKeypoint.y);
            ctx.lineTo(endKeypoint.x, endKeypoint.y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#e1f299'; // Light lime color
            ctx.stroke();
          }
        });
      }
    });
  };

  // Simple pose analysis function (in a real app, this would be more sophisticated)
  const analyzePoseAndGiveFeedback = (poses: poseDetection.Pose[]) => {
    if (!poses || poses.length === 0 || !poses[0].keypoints) {
      setFeedback("No pose detected. Please make sure your full body is visible.");
      return;
    }

    const pose = poses[0];
    const keypoints = pose.keypoints;

    // Check if key points are detected with good confidence
    const essentialPoints = ['nose', 'left_shoulder', 'right_shoulder', 'left_hip', 'right_hip'];
    const allPointsVisible = essentialPoints.every(point => {
      const keypoint = keypoints.find(kp => kp.name === point);
      return keypoint && keypoint.score && keypoint.score > 0.3;
    });

    if (!allPointsVisible) {
      setFeedback("Some key body parts are not clearly visible. Try adjusting your position.");
      return;
    }

    // Check for shoulder alignment (simplified example)
    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');

    if (leftShoulder && rightShoulder && leftShoulder.score && rightShoulder.score) {
      const heightDifference = Math.abs(leftShoulder.y - rightShoulder.y);

      if (heightDifference > 20) {
        setFeedback("Your shoulders are not level. Try to straighten your posture.");
      } else {
        setFeedback("Good shoulder alignment! Your posture looks balanced.");
      }
    }
  };

  // Capture a frame for download or sharing
  const captureFrame = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'pose-analysis.png';
    link.click();

    toast.success("Image saved!");
  };

  // Share result
  const shareResult = () => {
    if (navigator.share && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            const file = new File([blob], 'pose-analysis.png', { type: 'image/png' });
            await navigator.share({
              title: 'My PoseAI Analysis',
              text: 'Check out my pose analysis from PoseAI!',
              files: [file]
            });
          } catch (error) {
            console.error('Error sharing:', error);
            toast.error("Sharing failed. Try downloading instead.");
          }
        }
      });
    } else {
      toast.info("Sharing not supported on this browser. Download the image instead.");
    }
  };

  // Initialize TensorFlow and load model on component mount
  useEffect(() => {
    loadModel();

    // Cleanup on unmount
    return () => {
      setIsDetecting(false);
      if (detector) {
        // In a real app, we would properly dispose of the detector here
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">Live</span> Pose Analysis
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          Analyze your posture in real-time using your webcam. Our AI will track your movements and provide instant feedback.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-dark">Real-time Analysis</h2>
          <div className="flex space-x-2">
            <button
              onClick={captureFrame}
              className="p-2 rounded-md text-gray-dark hover:bg-lime-pale transition-colors"
              title="Download Image"
              disabled={!isDetecting}
            >
              <Download size={20} />
            </button>
            <button
              onClick={shareResult}
              className="p-2 rounded-md text-gray-dark hover:bg-lime-pale transition-colors"
              title="Share Result"
              disabled={!isDetecting}
            >
              <Share2 size={20} />
            </button>
            <button
              className="p-2 rounded-md text-gray-dark hover:bg-lime-pale transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video max-h-[70vh] flex items-center justify-center">
          {!cameraEnabled ? (
            <div className="text-center p-8">
              <div className="bg-lime-pale rounded-full p-5 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Camera className="h-8 w-8 text-lime-bright" />
              </div>
              <h3 className="text-lg font-semibold text-gray-dark mb-2">
                Camera Access Required
              </h3>
              <p className="text-gray-medium mb-4 max-w-md mx-auto">
                To analyze your posture, we need access to your camera. Your privacy is important to us - all processing happens in your browser.
              </p>
              <button
                onClick={enableCamera}
                className="primary-button"
                disabled={isModelLoading}
              >
                {isModelLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Loading AI model...
                  </>
                ) : (
                  "Enable Camera"
                )}
              </button>
            </div>
          ) : (
            <>
              <Webcam
                ref={webcamRef}
                className="absolute top-0 left-0 w-full h-full object-contain"
                mirrored={true}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user"
                }}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
              {!isDetecting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <button
                    onClick={startPoseDetection}
                    className="primary-button py-3 px-8"
                  >
                    Start Analysis
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {feedback && isDetecting && (
          <div className="mt-6 p-4 bg-lime-pale bg-opacity-60 rounded-md">
            <h3 className="font-semibold text-gray-dark mb-2">Feedback:</h3>
            <p className="text-gray-dark">{feedback}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-semibold text-gray-dark mb-3">Tips for accurate results:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-medium">
            <li className="flex items-start">
              <span className="inline-block bg-lime-pale rounded-full w-5 h-5 flex-shrink-0 mr-2"></span>
              Ensure good lighting conditions
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-lime-pale rounded-full w-5 h-5 flex-shrink-0 mr-2"></span>
              Position your entire body in the frame
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-lime-pale rounded-full w-5 h-5 flex-shrink-0 mr-2"></span>
              Wear form-fitting clothing for accuracy
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-lime-pale rounded-full w-5 h-5 flex-shrink-0 mr-2"></span>
              Clear the area of distracting objects
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-dark mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AI-powered Detection",
              description: "Our system uses TensorFlow.js to run advanced pose estimation models directly in your browser."
            },
            {
              title: "Real-time Feedback",
              description: "Get instant analysis of your posture and body alignment with actionable suggestions."
            },
            {
              title: "Privacy Focused",
              description: "All processing is done locally in your browser - your video never leaves your device."
            },
          ].map((item, index) => (
            <div key={index} className="p-4 border border-gray-lighter rounded-lg">
              <h3 className="font-medium text-gray-dark mb-2">{item.title}</h3>
              <p className="text-sm text-gray-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
