"use client";

import { Camera, Activity, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  features,
  price,
  link 
}: { 
  title: string;
  description: string;
  icon: any;
  features: string[];
  price: string;
  link: string;
}) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="bg-lime-pale w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-lime-bright" />
    </div>
    <h3 className="text-xl font-semibold text-gray-dark mb-2">{title}</h3>
    <p className="text-gray-medium mb-4">{description}</p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-600">
          <ArrowRight className="w-4 h-4 text-lime-bright mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <div className="border-t pt-4 mt-4">
      <div className="text-2xl font-bold text-gray-dark mb-4">{price}</div>
      <Link 
        href={link}
        className="block w-full py-2 px-4 bg-lime-bright hover:bg-lime-bright/90 text-white rounded-lg text-center transition-colors"
      >
        자세히 보기
      </Link>
    </div>
  </div>
);

export default function ServicesPage() {
  const services = [
    {
      title: "자세 분석",
      description: "AI가 당신의 자세를 분석하고 개선점을 찾아드립니다",
      icon: Camera,
      features: [
        "실시간 자세 분석",
        "상체/전신 분석 옵션",
        "자세 교정 가이드",
        "상세 리포트 제공"
      ],
      price: "무료",
      link: "/upload"
    },
    {
      title: "전문가 상담",
      description: "전문 물리치료사와 1:1 맞춤 상담을 진행합니다",
      icon: Users,
      features: [
        "온라인/오프라인 상담",
        "맞춤형 운동 처방",
        "정기적인 자세 체크",
        "전문가의 피드백"
      ],
      price: "50,000원/회",
      link: "/consultation"
    },
    {
      title: "자세 교정 프로그램",
      description: "체계적인 자세 교정 프로그램을 제공합니다",
      icon: Activity,
      features: [
        "8주 교정 프로그램",
        "주간 진도 체크",
        "맞춤형 운동 영상",
        "커뮤니티 지원"
      ],
      price: "200,000원/8주",
      link: "/program"
    },
    {
      title: "기업 솔루션",
      description: "기업 임직원을 위한 자세 관리 솔루션입니다",
      icon: Award,
      features: [
        "단체 분석 서비스",
        "정기 세미나 제공",
        "전담 물리치료사 배정",
        "맞춤형 보고서"
      ],
      price: "상담 문의",
      link: "/enterprise"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">서비스</span> 소개
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          AI 기술과 전문가의 경험을 결합하여 당신의 자세를 분석하고 개선하는 다양한 서비스를 제공합니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      <div className="mt-16 bg-lime-pale rounded-xl p-8 text-center">
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