"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart, Camera, Share2, Aperture, Layers, Users, Upload } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-lime-pale">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-dark mb-4">
                <span className="text-lime-bright">AI 기반</span> 자세 추정 분석
              </h1>
              <p className="text-gray-medium max-w-2xl mx-auto mb-8">
                이미지를 업로드하고 AI를 통해 자세나 움직임을 즉시 분석하세요. 댄서, 피트니스 강사, 건강 전문가에게 적합합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <button className="bg-lime-bright text-gray-dark px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
                  분석 시작하기
                </button>
                <button className="bg-white border-2 border-lime-bright text-gray-dark px-6 py-3 rounded-lg font-medium hover:bg-lime-pale transition">
                  예시 보기
                </button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
              <div className="relative w-full aspect-video shadow-2xl rounded-2xl overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/3962230709/3799320279.svg+xml"
                  alt="Pose estimation demo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="mt-16 lg:mt-24 mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "사용자", value: "40,000+" },
                { label: "분석된 이미지", value: "2M+" },
                { label: "정확도", value: "97%" },
                { label: "사용 사례", value: "20+" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-lime-bright text-3xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-dark">
              어떻게 <span className="text-lime-bright">작동하나요</span>
            </h2>
            <p className="text-gray-medium text-lg max-w-3xl mx-auto">
              AI 기반 자세 추정 기술로 어떤 자세나 움직임도 쉽게 분석하고 개선할 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Upload className="h-10 w-10 text-lime-bright" />,
                title: "이미지 업로드",
                description: "이미지를 업로드하거나 플랫폼을 통해 직접 사진을 찍으세요.",
              },
              {
                icon: <Aperture className="h-10 w-10 text-lime-bright" />,
                title: "AI 분석",
                description: "고급 AI가 신체 자세, 각도 및 정렬을 분석합니다.",
              },
              {
                icon: <BarChart className="h-10 w-10 text-lime-bright" />,
                title: "결과 받기",
                description: "상세한 분석과 개선을 위한 제안을 받으세요.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition-all text-center">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-dark">
                  {step.title}
                </h3>
                <p className="text-gray-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-lime-pale">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-dark">
              강력한 <span className="text-lime-bright">기능</span>
            </h2>
            <p className="text-gray-medium text-lg max-w-3xl mx-auto">
              PoseAI는 모든 자세 분석 요구에 대한 포괄적인 도구를 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-8 w-8 text-lime-bright" />,
                title: "다각도 분석",
                description: "다양한 각도에서 자세를 분석하여 포괄적인 통찰을 제공합니다.",
              },
              {
                icon: <Share2 className="h-8 w-8 text-lime-bright" />,
                title: "쉬운 공유",
                description: "결과를 트레이너, 강사 또는 의료 제공자와 공유하세요.",
              },
              {
                icon: <Layers className="h-8 w-8 text-lime-bright" />,
                title: "진행 추적",
                description: "시간 경과에 따른 자세 개선을 역사적 데이터로 추적하세요.",
              },
              {
                icon: <Users className="h-8 w-8 text-lime-bright" />,
                title: "팀 협업",
                description: "팀원이나 고객과 자세 개선에 대해 협업하세요.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-dark">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-dark">
              누가 <span className="text-lime-bright">혜택을 받을 수 있나요</span>
            </h2>
            <p className="text-gray-medium text-lg max-w-3xl mx-auto">
              우리의 기술은 다양한 전문가와 애호가에게 서비스를 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "댄스 강사",
                description: "댄스 포즈와 움직임을 분석하여 정확한 피드백과 교정을 제공합니다.",
                cta: "자세히 알아보기",
                href: "/use-cases/dance",
              },
              {
                title: "피트니스 트레이너",
                description: "운동 중 올바른 자세를 유지하여 부상을 방지합니다.",
                cta: "자세히 알아보기",
                href: "/use-cases/fitness",
              },
              {
                title: "물리 치료사",
                description: "환자의 진행 상황을 추적하고 운동이 올바르게 수행되도록 합니다.",
                cta: "자세히 알아보기",
                href: "/use-cases/therapy",
              },
            ].map((useCase, index) => (
              <div key={index} className="border border-gray-lighter rounded-xl p-8 hover:border-lime-bright transition-all">
                <h3 className="text-xl font-semibold mb-4 text-gray-dark">
                  {useCase.title}
                </h3>
                <p className="text-gray-medium mb-6">
                  {useCase.description}
                </p>
                <Link
                  href={useCase.href}
                  className="text-lime-bright font-medium flex items-center"
                >
                  {useCase.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-lime-bright">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-dark">
              움직임을 분석할 준비가 되셨나요?
            </h2>
            <p className="text-gray-dark text-lg mb-8 max-w-2xl mx-auto">
              PoseAI를 사용하여 기술을 향상하고 부상을 예방하며 성능을 향상시키는 수천 명의 전문가에 합류하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gray-dark text-white hover:bg-opacity-90 py-3 px-8 rounded-md font-semibold transition-all"
              >
                무료로 시작하기
              </Link>
              <Link
                href="/contact"
                className="bg-white text-gray-dark hover:bg-opacity-90 py-3 px-8 rounded-md font-semibold transition-all"
              >
                영업 문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
