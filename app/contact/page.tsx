'use client';

import logo from '@assets/images/logo-black.svg';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CS_EMAIL } from '@/constants/basic';

// 더미 문의 데이터 (개인정보 일부 숨김)
const recentInquiries = [
  {
    id: 1,
    name: '김*수',
    email: 'kim***@email.com',
    service: '웹',
    message: '이커머스 플랫폼 개발 문의드립니다. 기존 쇼핑몰을 리뉴얼하고 싶어요.',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: '이*희',
    email: 'lee***@gmail.com',
    service: '앱',
    message: '모바일 앱 UI/UX 디자인 및 개발이 필요합니다. 사용자 경험을 중시하고 싶어요.',
    date: '2024-01-14',
  },
  {
    id: 3,
    name: '박*수',
    email: 'park***@company.com',
    service: '웹',
    message: '기업용 대시보드 시스템 구축을 원합니다. 실시간 데이터 시각화가 필요해요.',
    date: '2024-01-13',
  },
  {
    id: 4,
    name: '최*은',
    email: 'choi***@startup.io',
    service: '그래픽디자인',
    message: '소셜 네트워킹 앱 개발 프로젝트입니다. 브랜드 아이덴티티 디자인도 함께 진행하고 싶습니다.',
    date: '2024-01-12',
  },
  {
    id: 5,
    name: '정*현',
    email: 'jung***@business.co.kr',
    service: '웹',
    message: '온라인 쇼핑몰 리뉴얼 프로젝트 문의드립니다. 반응형 디자인이 중요합니다.',
    date: '2024-01-11',
  },
];

const ContactPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    timeline: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentInquiries.length);
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // 숫자만 추출
    
    // 전화번호 포맷팅 (010-1234-5678)
    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    if (errors.service) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.service;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.service) {
      newErrors.service = '서비스 종류를 선택해주세요.';
    }

    if (!formData.message.trim()) {
      newErrors.message = '문의 내용을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-6 pb-10 pt-10 sm:px-10">
      <div className="mb-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="h-10 w-10 sm:h-10 sm:w-10 lg:h-16 lg:w-16"
            />
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-7xl">
              Contact Us
            </h1>
          </div>
          <Link
            href="/"
            className="group flex w-fit items-center gap-x-1 transition-colors duration-300 sm:gap-x-1.5"
          >
            <span className="font-sans text-xl font-medium text-black transition-colors duration-300 group-hover:text-blue-600 sm:text-xl lg:text-2xl">
              Go to Home
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-colors duration-300 group-hover:bg-black sm:h-10 sm:w-10 lg:h-12 lg:w-12">
              <ArrowUpRight className="h-4 w-4 transition-colors duration-300 group-hover:text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="name"
                    className="w-24 shrink-0 text-sm font-semibold text-slate-700"
                  >
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`flex-1 border-b bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:outline-none ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-300 focus:border-slate-900'
                    }`}
                    placeholder="홍길동"
                  />
                </div>
                {errors.name && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0" />
                    <p className="text-xs text-red-500">{errors.name}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="email"
                    className="w-24 shrink-0 text-sm font-semibold text-slate-700"
                  >
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`flex-1 border-b bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:outline-none ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-300 focus:border-slate-900'
                    }`}
                    placeholder="example@email.com"
                  />
                </div>
                {errors.email && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0" />
                    <p className="text-xs text-red-500">{errors.email}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label
                  htmlFor="phone"
                  className="w-24 shrink-0 text-sm font-semibold text-slate-700"
                >
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={13}
                  className="flex-1 border-b border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
                  placeholder="010-0000-0000"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <label className="w-24 shrink-0 text-sm font-semibold text-slate-700">
                    서비스 종류 *
                  </label>
                  <div className="flex flex-1 items-center gap-6 sm:gap-8">
                    <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                      <input
                        type="radio"
                        name="service"
                        value="web"
                        checked={formData.service === 'web'}
                        onChange={() => handleServiceChange('web')}
                        className="h-4 w-4 shrink-0 cursor-pointer border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-700">웹</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                      <input
                        type="radio"
                        name="service"
                        value="app"
                        checked={formData.service === 'app'}
                        onChange={() => handleServiceChange('app')}
                        className="h-4 w-4 shrink-0 cursor-pointer border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-700">앱</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                      <input
                        type="radio"
                        name="service"
                        value="design"
                        checked={formData.service === 'design'}
                        onChange={() => handleServiceChange('design')}
                        className="h-4 w-4 shrink-0 cursor-pointer border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-700">그래픽디자인</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                      <input
                        type="radio"
                        name="service"
                        value="discuss"
                        checked={formData.service === 'discuss'}
                        onChange={() => handleServiceChange('discuss')}
                        className="h-4 w-4 shrink-0 cursor-pointer border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-700">협의후 결정</span>
                    </label>
                  </div>
                </div>
                {errors.service && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0" />
                    <p className="text-xs text-red-500">{errors.service}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label
                  htmlFor="timeline"
                  className="w-24 shrink-0 text-sm font-semibold text-slate-700"
                >
                  프로젝트 기간
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="flex-1 border-b border-slate-300 bg-transparent px-0 py-2 text-slate-900 focus:border-slate-900 focus:outline-none"
                >
                  <option value="">선택해주세요</option>
                  <option value="under-1m">1개월 미만</option>
                  <option value="1-3m">1개월 ~ 3개월</option>
                  <option value="3-6m">3개월 ~ 6개월</option>
                  <option value="6-12m">6개월 ~ 12개월</option>
                  <option value="over-12m">12개월 이상</option>
                  <option value="discuss">협의 후 결정</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-4">
                  <label
                    htmlFor="message"
                    className="w-24 shrink-0 pt-2 text-sm font-semibold text-slate-700"
                  >
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`flex-1 border-b bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:outline-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-300 focus:border-slate-900'
                    }`}
                    placeholder="프로젝트에 대해 자세히 설명해주세요."
                  />
                </div>
                {errors.message && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0" />
                    <p className="text-xs text-red-500">{errors.message}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="w-24 shrink-0" />
                <button
                  type="submit"
                  className="mt-6 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                >
                  문의하기
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="flex flex-col gap-8 flex-1">
            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
              <div className="space-y-6">
                {/* 대표자 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">대표자</h3>
                    <p className="text-slate-700">변진영</p>
                  </div>
                </div>
                {/* 전화번호 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">전화번호</h3>
                    <a
                      href="tel:010-5923-3761"
                      className="text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      010-5923-3761
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Email</h3>
                    <a
                      href={`mailto:${CS_EMAIL}`}
                      className="text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      {CS_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 문의 내용 카드 */}
            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8 flex flex-col flex-1">
              <div className="relative w-full flex-1 overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="w-full shrink-0"
                    >
                      <div className="space-y-3 pr-2 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {inquiry.name}
                            </p>
                            <p className="text-xs text-slate-500 break-all">
                              {inquiry.email}
                            </p>
                          </div>
                          <span className="text-xs text-slate-400 shrink-0 whitespace-nowrap">
                            {inquiry.date}
                          </span>
                        </div>
                        <div>
                          <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            {inquiry.service}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 인디케이터 */}
              <div className="mt-6 flex justify-center gap-2 shrink-0">
                {recentInquiries.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-slate-900'
                        : 'w-1 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;

