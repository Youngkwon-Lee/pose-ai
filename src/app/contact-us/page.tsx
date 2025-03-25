"use client";

import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consultType: 'posture' // 기본값
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 실제 폼 제출 로직 구현
    toast.success('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          전문가 <span className="text-lime-bright">상담</span>
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          자세 교정에 대해 전문가와 상담하실 수 있습니다. 아래 양식을 작성해 주시면 24시간 이내에 연락드리겠습니다.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-dark font-medium mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-dark font-medium mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-dark font-medium mb-2">
              연락처
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
              placeholder="010-1234-5678"
            />
          </div>

          <div>
            <label htmlFor="consultType" className="block text-gray-dark font-medium mb-2">
              상담 유형
            </label>
            <select
              id="consultType"
              name="consultType"
              value={formData.consultType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
            >
              <option value="posture">자세 교정</option>
              <option value="exercise">운동 처방</option>
              <option value="therapy">물리 치료</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-dark font-medium mb-2">
              상담 내용
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
              placeholder="상담하고 싶으신 내용을 자세히 적어주세요."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-bright text-white py-3 px-6 rounded-lg font-medium hover:bg-lime-600 transition-colors"
          >
            상담 신청하기
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-dark mb-3">연락처</h3>
          <p className="text-gray-medium">
            전화: 02-1234-5678<br />
            이메일: contact@lilys.ai
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-dark mb-3">상담 시간</h3>
          <p className="text-gray-medium">
            평일: 09:00 - 18:00<br />
            주말 및 공휴일 휴무
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-dark mb-3">위치</h3>
          <p className="text-gray-medium">
            서울특별시 강남구<br />
            테헤란로 123 4층
          </p>
        </div>
      </div>
    </div>
  );
} 