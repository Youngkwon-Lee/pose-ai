"use client";

import { Camera, Users, Brain, Award, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: Camera,
      title: "AI 자세 분석",
      description: "최첨단 AI 기술을 활용하여 실시간으로 자세를 분석하고 개선점을 제시합니다.",
      features: [
        "실시간 자세 분석",
        "3D 모델링 시각화",
        "자세 교정 가이드라인",
        "상세한 분석 리포트"
      ]
    },
    {
      icon: Users,
      title: "전문가 상담",
      description: "경험 많은 자세 교정 전문가들이 1:1로 맞춤형 상담을 제공합니다.",
      features: [
        "1:1 맞춤형 상담",
        "전문가 직접 상담",
        "상세한 교정 계획",
        "정기적인 피드백"
      ]
    },
    {
      icon: Brain,
      title: "맞춤형 교정 프로그램",
      description: "개인의 상태와 목표에 맞는 맞춤형 자세 교정 프로그램을 제공합니다.",
      features: [
        "개인별 맞춤 프로그램",
        "단계별 교정 과정",
        "진행 상황 모니터링",
        "목표 달성 트래킹"
      ]
    }
  ];

  const benefits = [
    {
      title: "과학적인 접근",
      description: "AI 기술과 전문가의 경험을 결합한 과학적인 자세 교정"
    },
    {
      title: "편리한 관리",
      description: "언제 어디서나 접근 가능한 온라인 자세 관리 시스템"
    },
    {
      title: "전문가 지원",
      description: "자세 교정 전문가들의 지속적인 모니터링과 피드백"
    },
    {
      title: "맞춤형 솔루션",
      description: "개인의 상태와 목표에 맞는 맞춤형 교정 프로그램"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">AI 기반</span> 자세 교정 서비스
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          최신 AI 기술과 전문가의 경험을 결합하여 당신의 자세를 과학적으로 분석하고 개선합니다.
        </p>
      </div>

      {/* 서비스 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-lime-pale w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <service.icon className="w-6 h-6 text-lime-bright" />
            </div>
            <h3 className="text-xl font-semibold text-gray-dark mb-3">{service.title}</h3>
            <p className="text-gray-medium mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-medium">
                  <CheckCircle className="w-4 h-4 text-lime-bright mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 장점 섹션 */}
      <div className="bg-lime-pale bg-opacity-40 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-dark text-center mb-8">
          서비스 특장점
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg p-6 flex items-start">
              <Award className="w-6 h-6 text-lime-bright mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-dark mb-2">{benefit.title}</h3>
                <p className="text-gray-medium text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-dark mb-4">
          지금 시작하세요
        </h2>
        <p className="text-gray-medium mb-6 max-w-2xl mx-auto">
          AI 자세 분석부터 전문가 상담까지, 체계적인 자세 교정을 시작해보세요.
        </p>
        <Link 
          href="/contact"
          className="inline-flex items-center bg-lime-bright text-gray-dark px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
        >
          무료 상담 신청하기
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
} 