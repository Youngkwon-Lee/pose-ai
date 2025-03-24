"use client";

import { Camera, Brain, LineChart, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const StepCard = ({
  step,
  title,
  description,
  icon: Icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: any;
}) => (
  <div className="relative flex items-start p-6 bg-white rounded-xl shadow-md">
    <div className="absolute -top-4 left-6 bg-lime-bright text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
      {step}
    </div>
    <div className="bg-lime-pale w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-2">
      <Icon className="w-6 h-6 text-lime-bright" />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-dark mb-2">{title}</h3>
      <p className="text-gray-medium">{description}</p>
    </div>
  </div>
);

const FeatureCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className="bg-lime-pale w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-lime-bright" />
    </div>
    <h3 className="text-xl font-semibold text-gray-dark mb-2">{title}</h3>
    <p className="text-gray-medium">{description}</p>
  </div>
);

export default function HowItWorksPage() {
  const steps = [
    {
      title: "사진 업로드",
      description: "전신 또는 상체 사진을 업로드하거나 실시간 카메라로 촬영하세요.",
      icon: Camera,
    },
    {
      title: "AI 분석",
      description: "고급 AI 알고리즘이 자세를 분석하고 문제점을 파악합니다.",
      icon: Brain,
    },
    {
      title: "결과 확인",
      description: "상세한 분석 결과와 개선이 필요한 부분을 확인하세요.",
      icon: LineChart,
    },
    {
      title: "전문가 상담",
      description: "필요한 경우 전문가와 1:1 상담을 통해 맞춤형 솔루션을 받으세요.",
      icon: Users,
    },
  ];

  const features = [
    {
      title: "정확한 자세 분석",
      description: "MediaPipe와 TensorFlow.js를 활용한 고정밀 자세 분석 기술",
      icon: Brain,
    },
    {
      title: "실시간 피드백",
      description: "즉각적인 분석 결과와 개선 방안 제시",
      icon: LineChart,
    },
    {
      title: "전문가 네트워크",
      description: "경험 많은 물리치료사와 자세 교정 전문가 연결",
      icon: Users,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">어떻게</span> 작동하나요?
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          AI 기술과 전문가의 경험을 결합한 정확하고 신뢰할 수 있는 자세 분석 서비스를 제공합니다
        </p>
      </div>

      {/* 단계별 설명 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            step={index + 1}
            title={step.title}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>

      {/* 기술 설명 섹션 */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-dark mb-4">
            최신 기술 활용
          </h2>
          <p className="text-gray-medium max-w-2xl mx-auto">
            정확한 자세 분석을 위해 최신 AI 기술과 전문가 시스템을 활용합니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-dark text-center mb-12">
          자주 묻는 질문
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-dark mb-2">
              분석은 얼마나 걸리나요?
            </h3>
            <p className="text-gray-medium">
              AI 분석은 즉시 이루어지며, 몇 초 내에 결과를 확인할 수 있습니다.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-dark mb-2">
              분석 결과는 얼마나 정확한가요?
            </h3>
            <p className="text-gray-medium">
              MediaPipe와 TensorFlow.js 기반의 AI 모델을 사용하여 90% 이상의 정확도를 제공합니다.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-dark mb-2">
              전문가 상담은 어떻게 진행되나요?
            </h3>
            <p className="text-gray-medium">
              화상 상담 또는 대면 상담 중 선택할 수 있으며, 분석 결과를 바탕으로 맞춤형 상담이 진행됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="bg-lime-pale rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-dark mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-medium mb-6">
          무료 자세 분석을 통해 당신의 자세를 확인하고 개선해보세요
        </p>
        <Link
          href="/upload"
          className="inline-block py-3 px-6 bg-lime-bright hover:bg-lime-bright/90 text-white rounded-lg font-medium transition-colors"
        >
          자세 분석 시작하기
        </Link>
      </div>
    </div>
  );
} 