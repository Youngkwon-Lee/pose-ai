"use client";

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '일반 문의',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      errors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.phone.trim()) {
      errors.phone = '연락처를 입력해주세요';
    } else if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/.test(formData.phone)) {
      errors.phone = '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)';
    }

    if (!formData.message.trim()) {
      errors.message = '문의 내용을 입력해주세요';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 7) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('입력 정보를 확인해주세요');
      return;
    }

    setIsSubmitting(true);

    try {
      // API 엔드포인트로 데이터 전송
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('문의 전송에 실패했습니다');
      }

      setIsSubmitted(true);
      toast.success('문의가 성공적으로 전송되었습니다');
      
      // 폼 초기화
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '일반 문의',
        message: ''
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast.error('문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_API_KEY&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5012, 127.0396), // 서울 강남구 테헤란로
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);
        
        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(37.5012, 127.0396);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        // 커스텀 오버레이 추가
        const content = `
          <div class="bg-white px-4 py-2 rounded-lg shadow-md">
            <p class="font-medium text-gray-dark">PoseAI</p>
            <p class="text-sm text-gray-medium">서울특별시 강남구 테헤란로 123</p>
          </div>
        `;
        
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1.3
        });
        customOverlay.setMap(map);
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "전화 문의",
      content: "02-1234-5678",
      description: "평일 09:00 - 18:00"
    },
    {
      icon: Mail,
      title: "이메일 문의",
      content: "support@posture.ai",
      description: "24시간 접수 가능"
    },
    {
      icon: MapPin,
      title: "위치",
      content: "서울특별시 강남구 테헤란로 123",
      description: "포스처빌딩 4층"
    },
    {
      icon: Clock,
      title: "운영시간",
      content: "평일 09:00 - 18:00",
      description: "주말 및 공휴일 휴무"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-dark mb-4">
          <span className="text-lime-bright">문의</span>하기
        </h1>
        <p className="text-gray-medium max-w-2xl mx-auto">
          서비스 이용에 궁금한 점이 있으시다면 언제든 문의해주세요
        </p>
      </div>

      {/* 연락처 정보 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {contactInfo.map((info, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="bg-lime-pale w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <info.icon className="w-6 h-6 text-lime-bright" />
            </div>
            <h3 className="text-lg font-semibold text-gray-dark mb-2">{info.title}</h3>
            <p className="text-gray-dark font-medium mb-1">{info.content}</p>
            <p className="text-gray-medium text-sm">{info.description}</p>
          </div>
        ))}
      </div>

      {/* 문의 폼 섹션 */}
      <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-dark mb-6 text-center">
          문의하기
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-dark font-medium mb-2">
                이름 {formErrors.name && <span className="text-red-500 text-sm ml-2">{formErrors.name}</span>}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright`}
                required
              />
            </div>
            <div>
              <label className="block text-gray-dark font-medium mb-2">
                이메일 {formErrors.email && <span className="text-red-500 text-sm ml-2">{formErrors.email}</span>}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-dark font-medium mb-2">
                연락처 {formErrors.phone && <span className="text-red-500 text-sm ml-2">{formErrors.phone}</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="010-1234-5678"
                className={`w-full px-4 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright`}
                required
              />
            </div>
            <div>
              <label className="block text-gray-dark font-medium mb-2">
                문의 유형
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright"
              >
                <option value="일반 문의">일반 문의</option>
                <option value="서비스 이용">서비스 이용</option>
                <option value="기술 지원">기술 지원</option>
                <option value="제휴 문의">제휴 문의</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-dark font-medium mb-2">
              문의 내용 {formErrors.message && <span className="text-red-500 text-sm ml-2">{formErrors.message}</span>}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border ${formErrors.message ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-bright`}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-3 bg-lime-bright hover:bg-lime-bright/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  전송중...
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  전송완료
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  문의하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 지도 섹션 */}
      <div className="mt-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div id="map" className="w-full h-[400px]"></div>
        </div>
      </div>
    </div>
  );
} 