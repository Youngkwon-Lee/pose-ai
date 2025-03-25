"use client";

import { Activity, Users, Camera, Upload, Brain, ChartBar, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: <Upload className="w-8 h-8 text-lime-bright" />,
      title: "이미지 자세 분석",
      description: "사진을 업로드하여 AI가 자세를 분석하고 개선점을 제시합니다.",
      features: [
        "정확한 자세 측정",
        "상세한 분석 리포트",
        "맞춤형 개선 제안"
      ]
    },
    {
      icon: <Camera className="w-8 h-8 text-lime-bright" />,
      title: "실시간 자세 분석",
      description: "웹캠을 통해 실시간으로 자세를 분석하고 즉각적인 피드백을 제공합니다.",
      features: [
        "실시간 자세 모니터링",
        "즉각적인 피드백",
        "자세 교정 가이드"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-lime-bright" />,
      title: "전문가 상담",
      description: "분석 결과를 바탕으로 전문가와 1:1 맞춤 상담을 진행합니다.",
      features: [
        "전문가 매칭",
        "맞춤형 운동 처방",
        "정기적인 피드백"
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-lime-bright" />,
      title: "AI 자세 교정",
      description: "인공지능이 당신의 자세를 학습하고 최적의 교정 방법을 제시합니다.",
      features: [
        "AI 기반 분석",
        "개인화된 교정 계획",
        "진행 상황 추적"
      ]
    }
  ];

  const features = [
    {
      icon: <ChartBar className="w-6 h-6 text-lime-bright" />,
      title: "정확한 분석",
      description: "최신 AI 기술을 활용한 정확한 자세 분석"
    },
    {
      icon: <Shield className="w-6 h-6 text-lime-bright" />,
      title: "데이터 보안",
      description: "철저한 개인정보 보호와 데이터 암호화"
    },
    {
      icon: <Clock className="w-6 h-6 text-lime-bright" />,
      title: "신속한 결과",
      description: "실시간 분석 및 즉각적인 피드백 제공"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* 헤더 섹션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            우리의 <span className="text-lime-bright">서비스</span>
          </h1>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            최신 AI 기술과 전문가의 경험이 만나 당신의 자세를 개선합니다
          </p>
        </div>
      </div>

      {/* 서비스 목록 */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-medium mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-medium">
                        <Activity className="w-4 h-4 text-lime-bright mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 특징 섹션 */}
      <div className="mt-24 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark">
              서비스 <span className="text-lime-bright">특징</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  {feature.icon}
                </div>
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

      {/* CTA 섹션 */}
      <div className="mt-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-dark mb-4">
          지금 시작해보세요
        </h2>
        <p className="text-xl text-gray-medium mb-8">
          무료로 첫 자세 분석을 경험해보세요
        </p>
        <Link
          href="/upload"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-bright hover:bg-lime-600 transition-colors"
        >
          무료로 시작하기
        </Link>
      </div>
    </div>
  );
} 