"use client";

import { Upload, Camera, Brain, ChartBar, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-lime-bright" />,
      title: "이미지 업로드",
      description: "전신이 나오는 사진을 업로드하거나 웹캠으로 실시간 촬영을 시작하세요.",
      details: [
        "JPEG, PNG 형식 지원",
        "최대 10MB 크기",
        "고화질 이미지 권장"
      ]
    },
    {
      icon: <Brain className="w-12 h-12 text-lime-bright" />,
      title: "AI 분석",
      description: "고급 AI 알고리즘이 자세를 분석하고 문제점을 파악합니다.",
      details: [
        "자세 각도 측정",
        "신체 정렬 분석",
        "문제점 식별"
      ]
    },
    {
      icon: <ChartBar className="w-12 h-12 text-lime-bright" />,
      title: "결과 확인",
      description: "상세한 분석 결과와 개선 방안을 확인하세요.",
      details: [
        "시각화된 분석 결과",
        "구체적인 개선점",
        "맞춤형 운동 추천"
      ]
    },
    {
      icon: <Users className="w-12 h-12 text-lime-bright" />,
      title: "전문가 상담",
      description: "필요한 경우 전문가와 1:1 상담을 통해 맞춤형 솔루션을 받으세요.",
      details: [
        "전문가 매칭",
        "맞춤형 운동 처방",
        "지속적인 관리"
      ]
    }
  ];

  const features = [
    {
      title: "실시간 분석",
      description: "웹캠을 통한 실시간 자세 분석으로 즉각적인 피드백을 제공합니다."
    },
    {
      title: "정확한 측정",
      description: "AI가 신체의 주요 지점을 정확하게 감지하여 자세를 분석합니다."
    },
    {
      title: "맞춤형 솔루션",
      description: "개인의 상태에 맞는 맞춤형 운동과 교정 방법을 제안합니다."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* 헤더 섹션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            서비스 <span className="text-lime-bright">이용 방법</span>
          </h1>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            AI 자세 분석 서비스 이용 방법을 알아보세요
          </p>
        </div>
      </div>

      {/* 단계별 설명 */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                {step.title}
              </h3>
              <p className="text-gray-medium mb-4">
                {step.description}
              </p>
              <ul className="text-left space-y-2">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-gray-medium text-sm">
                    <ArrowRight className="w-4 h-4 text-lime-bright mr-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 기능 설명 */}
      <div className="mt-24 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark">
              주요 <span className="text-lime-bright">기능</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 실시간 분석 섹션 */}
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-dark mb-4">
                실시간 <span className="text-lime-bright">자세 분석</span>
              </h2>
              <p className="text-gray-medium mb-6">
                웹캠을 통해 실시간으로 자세를 분석하고 즉각적인 피드백을 받아보세요.
                AI가 당신의 자세를 실시간으로 모니터링하고 개선점을 알려드립니다.
              </p>
              <Link
                href="/live"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-bright hover:bg-lime-600 transition-colors"
              >
                실시간 분석 시작하기
                <Camera className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-dark mb-4">실시간 분석 기능</h3>
              <ul className="space-y-3">
                {[
                  "실시간 자세 감지",
                  "즉각적인 피드백",
                  "자세 교정 가이드",
                  "데이터 기록 및 추적"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-medium">
                    <ArrowRight className="w-4 h-4 text-lime-bright mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="mt-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-dark mb-4">
          지금 시작해보세요
        </h2>
        <p className="text-xl text-gray-medium mb-8">
          AI 자세 분석으로 더 건강한 생활을 시작하세요
        </p>
        <Link
          href="/upload"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-bright hover:bg-lime-600 transition-colors"
        >
          무료로 시작하기
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
} 