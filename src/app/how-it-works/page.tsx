"use client";

import { Camera, Brain, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Camera,
      title: "자세 촬영",
      description: "웹캠을 통해 실시간으로 자세를 촬영하거나, 기존 영상/사진을 업로드합니다.",
      details: [
        "웹캠을 통한 실시간 촬영",
        "사진/영상 파일 업로드 지원",
        "다양한 각도에서 촬영 가능",
        "고화질 이미지 처리"
      ]
    },
    {
      icon: Brain,
      title: "AI 분석",
      description: "최첨단 AI 기술이 자세를 분석하고 문제점을 파악합니다.",
      details: [
        "실시간 자세 분석",
        "3D 모델링 생성",
        "문제점 자동 감지",
        "개선점 도출"
      ]
    },
    {
      icon: Users,
      title: "전문가 리뷰",
      description: "자세 교정 전문가가 AI 분석 결과를 검토하고 맞춤형 솔루션을 제시합니다.",
      details: [
        "AI 분석 결과 검토",
        "맞춤형 교정 방안 제시",
        "전문가 조언 제공",
        "진행 상황 모니터링"
      ]
    }
  ];

  const features = [
    {
      title: "정확한 분석",
      description: "AI 기술을 활용한 정밀한 자세 분석으로 문제점을 정확히 파악합니다."
    },
    {
      title: "실시간 피드백",
      description: "실시간으로 자세를 분석하고 즉각적인 피드백을 제공합니다."
    },
    {
      title: "전문가 지원",
      description: "경험 많은 전문가들이 맞춤형 교정 방안을 제시합니다."
    },
    {
      title: "체계적인 관리",
      description: "단계별 교정 프로그램으로 지속적인 자세 개선을 지원합니다."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          서비스 <span className="text-lime-bright">이용 방법</span>
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          AI 기술과 전문가의 경험이 만나 당신의 자세를 과학적으로 분석하고 개선하는 과정을 소개합니다.
        </p>
      </div>

      {/* 단계별 설명 */}
      <div className="relative mb-16">
        <div className="absolute top-0 left-1/2 h-full w-1 bg-lime-pale -translate-x-1/2 md:block hidden" />
        
        <div className="space-y-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="md:grid md:grid-cols-2 gap-8 items-center">
              <div className={`md:${index % 2 === 0 ? 'text-right' : 'order-2'}`}>
                <div className="bg-white rounded-xl shadow-md p-6 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 bg-lime-bright w-8 h-8 rounded-full flex items-center justify-center text-white font-bold md:block hidden
                    ${index % 2 === 0 ? 'right-[-52px]' : 'left-[-52px]'}"
                  >
                    {index + 1}
                  </div>
                  <div className="bg-lime-pale w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-lime-bright" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-dark mb-3">{step.title}</h3>
                  <p className="text-gray-medium mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-medium">
                        <CheckCircle2 className="w-4 h-4 text-lime-bright mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`hidden md:block ${index % 2 === 0 ? 'order-2' : ''}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 특징 섹션 */}
      <div className="bg-lime-pale bg-opacity-40 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-dark text-center mb-8">
          서비스 특징
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-dark mb-2">{feature.title}</h3>
              <p className="text-gray-medium text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-dark mb-4">
          지금 시작하세요
        </h2>
        <p className="text-gray-medium mb-6">
          AI 자세 분석을 통해 당신의 자세를 개선해보세요.
        </p>
        <div className="space-x-4">
          <Link 
            href="/services"
            className="inline-flex items-center bg-lime-bright text-gray-dark px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
          >
            서비스 알아보기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-white border-2 border-lime-bright text-gray-dark px-6 py-3 rounded-lg font-medium hover:bg-lime-pale transition"
          >
            무료 상담 신청
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 