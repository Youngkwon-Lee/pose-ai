"use client";

import { ArrowRight, ThumbsUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ExampleCard = ({
  title,
  description,
  beforeImage,
  afterImage,
  issues,
  improvements,
  score,
}: {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  issues: string[];
  improvements: string[];
  score: number;
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-dark mb-2">{title}</h3>
      <p className="text-gray-medium mb-4">{description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-medium mb-2">교정 전</p>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={beforeImage}
              alt="Before correction"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
              quality={100}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-medium mb-2">교정 후</p>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={afterImage}
              alt="After correction"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h4 className="font-semibold text-gray-dark">발견된 문제점</h4>
          </div>
          <ul className="space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                {issue}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <ThumbsUp className="w-5 h-5 text-lime-bright mr-2" />
            <h4 className="font-semibold text-gray-dark">개선 사항</h4>
          </div>
          <ul className="space-y-1">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <ArrowRight className="w-4 h-4 text-lime-bright mr-2" />
                {improvement}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-gray-medium">자세 점수</span>
            <span className={`text-xl font-bold ${
              score >= 80 ? 'text-lime-bright' : 'text-red-500'
            }`}>
              {score}점
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${
                score >= 80 ? 'bg-lime-bright' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ExamplesPage() {
  const examples = [
    {
      title: "거북목 자세 교정",
      description: "장시간 컴퓨터 작업으로 인한 거북목 증상 개선 사례",
      beforeImage: "/examples/turtle-neck-before.svg",
      afterImage: "/examples/turtle-neck-after.svg",
      issues: [
        "목이 앞으로 15도 기울어짐",
        "어깨가 앞으로 말림",
        "상체가 앞으로 기울어짐"
      ],
      improvements: [
        "목 기울기 5도 이내로 개선",
        "어깨 정렬 교정",
        "척추 정렬 개선"
      ],
      score: 85
    },
    {
      title: "허리 자세 교정",
      description: "잘못된 자세로 인한 허리 통증 개선 사례",
      beforeImage: "/examples/back-pain-before.svg",
      afterImage: "/examples/back-pain-after.svg",
      issues: [
        "골반이 틀어짐",
        "허리가 한쪽으로 기울어짐",
        "어깨 높이가 불균형함"
      ],
      improvements: [
        "골반 정렬 개선",
        "허리 기울기 교정",
        "어깨 높이 균형 조정"
      ],
      score: 90
    },
    {
      title: "휜 다리 교정",
      description: "O자형 다리로 인한 보행 문제 개선 사례",
      beforeImage: "/examples/leg-before.svg",
      afterImage: "/examples/leg-after.svg",
      issues: [
        "무릎이 바깥쪽으로 휨",
        "발목 정렬 불균형",
        "보행시 불안정"
      ],
      improvements: [
        "무릎 정렬 개선",
        "발목 안정성 향상",
        "보행 패턴 교정"
      ],
      score: 88
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-dark mb-4">
          자세 교정 <span className="text-lime-bright">성공 사례</span>
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          AI 자세 분석과 전문가 상담을 통해 성공적으로 자세를 교정한 사례들을 소개합니다
        </p>
      </div>

      {/* 예시 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {examples.map((example, index) => (
          <ExampleCard key={index} {...example} />
        ))}
      </div>

      {/* 통계 섹션 */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-dark mb-4">
            분석 결과
          </h2>
          <p className="text-gray-medium max-w-2xl mx-auto">
            지금까지의 자세 분석 및 교정 결과를 공유합니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-lime-bright mb-2">98%</div>
            <p className="text-gray-medium">사용자 만족도</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-lime-bright mb-2">5,000+</div>
            <p className="text-gray-medium">분석 완료</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-lime-bright mb-2">90%</div>
            <p className="text-gray-medium">증상 개선율</p>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="bg-lime-pale rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-dark mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-medium mb-6">
          AI 자세 분석을 통해 당신의 자세도 개선할 수 있습니다
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