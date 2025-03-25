"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart, Camera, Share2, Aperture, Layers, Users, Upload, Activity } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-b from-lime-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-dark mb-6">
              AI 기반 <span className="text-lime-bright">자세 분석</span> 솔루션
            </h1>
            <p className="text-xl text-gray-medium mb-8 max-w-2xl mx-auto">
              인공지능이 당신의 자세를 분석하고 개선방안을 제시합니다.
              전문가와 함께 더 건강한 자세를 만들어보세요.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/upload"
                className="bg-lime-bright text-white px-8 py-3 rounded-lg font-medium hover:bg-lime-600 transition-colors flex items-center"
              >
                지금 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/live"
                className="bg-white text-gray-dark px-8 py-3 rounded-lg font-medium border border-gray-lighter hover:border-lime-bright transition-colors flex items-center"
              >
                실시간 분석 <Camera className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-dark mb-12">
            주요 <span className="text-lime-bright">기능</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-lime-pale rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-lime-bright" />
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-3">이미지 분석</h3>
              <p className="text-gray-medium">
                사진을 업로드하여 자세를 분석하고 상세한 피드백을 받아보세요.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-lime-pale rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-lime-bright" />
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-3">실시간 분석</h3>
              <p className="text-gray-medium">
                웹캠을 통해 실시간으로 자세를 분석하고 즉각적인 피드백을 받아보세요.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-lime-pale rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-lime-bright" />
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-3">전문가 상담</h3>
              <p className="text-gray-medium">
                분석 결과를 바탕으로 전문가와 1:1 상담을 진행해보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 방법 섹션 */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-dark mb-12">
            사용 <span className="text-lime-bright">방법</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "사진 업로드",
                description: "전신이 나오는 사진을 업로드하세요"
              },
              {
                step: "2",
                title: "AI 분석",
                description: "AI가 자세를 자동으로 분석합니다"
              },
              {
                step: "3",
                title: "결과 확인",
                description: "상세한 분석 결과를 확인하세요"
              },
              {
                step: "4",
                title: "전문가 상담",
                description: "필요시 전문가와 상담하세요"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-lime-bright text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-dark mb-2">{item.title}</h3>
                <p className="text-gray-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-dark mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-medium mb-8">
            AI 자세 분석을 통해 더 건강한 생활을 시작해보세요
          </p>
          <Link
            href="/upload"
            className="bg-lime-bright text-white px-8 py-3 rounded-lg font-medium hover:bg-lime-600 transition-colors inline-flex items-center"
          >
            무료로 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
