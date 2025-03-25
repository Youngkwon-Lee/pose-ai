"use client";

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 실제 로그인 로직 구현
    toast.success('로그인되었습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-dark">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-medium">
            또는{' '}
            <Link href="/signup" className="text-lime-bright hover:text-lime-600">
              회원가입
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-2">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-lighter placeholder-gray-medium text-gray-dark focus:outline-none focus:ring-2 focus:ring-lime-bright focus:border-lime-bright sm:text-sm"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-dark mb-2">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-lighter placeholder-gray-medium text-gray-dark focus:outline-none focus:ring-2 focus:ring-lime-bright focus:border-lime-bright sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-lime-bright focus:ring-lime-bright border-gray-lighter rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-medium">
                로그인 상태 유지
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="text-lime-bright hover:text-lime-600">
                비밀번호 찾기
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-bright hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-bright"
            >
              로그인
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-lighter"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-medium">
                또는 다음으로 계속
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-lighter rounded-md shadow-sm bg-white text-sm font-medium text-gray-dark hover:bg-gray-50"
            >
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-lighter rounded-md shadow-sm bg-white text-sm font-medium text-gray-dark hover:bg-gray-50"
            >
              Kakao
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
