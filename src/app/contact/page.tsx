"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "자세 교정 상담",
    message: "",
    preferredTime: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "자세 교정 상담",
          message: "",
          preferredTime: ""
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">전문가</span>와 상담하기
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          자세 교정에 대해 전문가와 상담하실 수 있습니다. 아래 양식을 작성해주시면 24시간 이내에 연락드리겠습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-dark mb-2">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-2">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-dark mb-2">
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
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-dark mb-2">
                    선호하는 상담 시간
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
                  >
                    <option value="">선택해주세요</option>
                    <option value="morning">오전 (9:00 - 12:00)</option>
                    <option value="afternoon">오후 (13:00 - 17:00)</option>
                    <option value="evening">저녁 (18:00 - 21:00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-dark mb-2">
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
                  placeholder="상담하고 싶은 내용을 자세히 적어주세요."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-bright text-gray-dark py-3 rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-dark" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    상담 신청하기
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-dark mb-6">연락처 정보</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-lime-pale p-2 rounded-full">
                  <Phone className="w-5 h-5 text-lime-bright" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-dark">전화</h3>
                  <p className="text-gray-medium">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-lime-pale p-2 rounded-full">
                  <Mail className="w-5 h-5 text-lime-bright" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-dark">이메일</h3>
                  <p className="text-gray-medium">contact@pose-ai.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-lime-pale p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-lime-bright" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-dark">주소</h3>
                  <p className="text-gray-medium">서울특별시 강남구 테헤란로 123 AI빌딩 4층</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-lime-pale p-2 rounded-full">
                  <Clock className="w-5 h-5 text-lime-bright" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-dark">운영시간</h3>
                  <p className="text-gray-medium">평일: 09:00 - 21:00</p>
                  <p className="text-gray-medium">주말: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lime-pale bg-opacity-40 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-dark mb-4">전문가 상담 안내</h2>
            <ul className="space-y-3 text-sm text-gray-medium">
              <li>• 상담 신청 후 24시간 이내에 연락드립니다.</li>
              <li>• 첫 상담은 30분 무료로 진행됩니다.</li>
              <li>• 전문가가 1:1로 자세한 상담을 진행합니다.</li>
              <li>• 상담 후 맞춤형 교정 프로그램을 제공합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 