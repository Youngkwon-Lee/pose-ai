"use client";

import { ArrowRight, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ExamplesPage() {
  const examples = [
    {
      category: "자세 교정",
      title: "거북목 자세 교정",
      description: "AI가 거북목 자세를 감지하고 교정 방법을 제시한 사례입니다.",
      before: "/examples/turtle-neck-before.jpg",
      after: "/examples/turtle-neck-after.jpg",
      improvement: "목 각도 15도 개선",
      duration: "4주",
      rating: 4.8
    },
    {
      category: "자세 교정",
      title: "척추 측만증 교정",
      description: "척추 측만증 환자의 자세를 분석하고 개선한 사례입니다.",
      before: "/examples/scoliosis-before.jpg",
      after: "/examples/scoliosis-after.jpg",
      improvement: "척추 곡률 20% 감소",
      duration: "12주",
      rating: 4.9
    },
    {
      category: "운동 자세",
      title: "스쿼트 자세 교정",
      description: "잘못된 스쿼트 자세를 분석하고 교정한 사례입니다.",
      before: "/examples/squat-before.jpg",
      after: "/examples/squat-after.jpg",
      improvement: "무릎 각도 최적화",
      duration: "2주",
      rating: 4.7
    }
  ];

  const testimonials = [
    {
      name: "김민서",
      role: "직장인",
      comment: "거북목 증상이 있었는데, AI 분석을 통해 문제점을 정확히 파악하고 교정할 수 있었어요.",
      rating: 5
    },
    {
      name: "이준호",
      role: "운동 트레이너",
      comment: "고객들의 자세를 정확하게 분석하고 교정할 수 있어서 매우 유용합니다.",
      rating: 5
    },
    {
      name: "박지영",
      role: "학생",
      comment: "공부하느라 나빠진 자세를 교정하는데 많은 도움이 되었습니다.",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* 헤더 섹션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            분석 <span className="text-lime-bright">사례</span>
          </h1>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            AI 자세 분석을 통해 실제로 개선된 사례들을 확인해보세요
          </p>
        </div>
      </div>

      {/* 사례 목록 */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12">
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <div className="text-sm text-lime-bright font-medium mb-2">
                    {example.category}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-dark mb-4">
                    {example.title}
                  </h3>
                  <p className="text-gray-medium mb-6">
                    {example.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-medium">개선 효과</div>
                      <div className="font-semibold text-gray-dark">{example.improvement}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-medium">소요 기간</div>
                      <div className="font-semibold text-gray-dark">{example.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-2 font-semibold text-gray-dark">{example.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-8 bg-gray-50">
                  <div>
                    <div className="text-sm text-gray-medium mb-2">Before</div>
                    <div className="aspect-square relative bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={example.before}
                        alt="Before"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-medium mb-2">After</div>
                    <div className="aspect-square relative bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={example.after}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 사용자 후기 */}
      <div className="mt-24 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark">
              사용자 <span className="text-lime-bright">후기</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-medium mb-4">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-dark">{testimonial.name}</div>
                  <div className="text-sm text-gray-medium">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-4xl font-bold text-lime-bright mb-2">98%</div>
            <div className="text-gray-medium">사용자 만족도</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-4xl font-bold text-lime-bright mb-2">4.8</div>
            <div className="text-gray-medium">평균 평점</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-4xl font-bold text-lime-bright mb-2">10만+</div>
            <div className="text-gray-medium">분석 건수</div>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="mt-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-dark mb-4">
          지금 시작해보세요
        </h2>
        <p className="text-xl text-gray-medium mb-8">
          AI 자세 분석으로 당신의 자세도 개선해보세요
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