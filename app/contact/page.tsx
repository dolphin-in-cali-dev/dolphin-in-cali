'use client';

import logo from '@assets/images/logo-black.svg';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Footer from '@/app/components/Footer';
import { CS_EMAIL } from '@/constants/basic';
import { supabase } from '@/lib/supabase';

interface RecentInquiry {
  id: number;
  name: string;
  email: string;
  service: string;
  message: string;
  date: string;
}

// 서비스 타입 매핑
const serviceMap: Record<string, string> = {
  web: '웹',
  app: '앱',
  design: '그래픽디자인',
  discuss: '협의후 결정',
};

// 개인정보 마스킹 함수
const maskName = (name: string): string => {
  if (name.length <= 2) return `${name[0]}*`;
  return `${name[0]}${'*'.repeat(name.length - 2)}${name[name.length - 1]}`;
};

const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  if (localPart.length <= 3) return `${localPart[0]}***@${domain}`;
  return `${localPart.slice(0, 3)}***@${domain}`;
};

const ContactPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    timeline: '',
    message: '',
    isPrivate: false, // 기본값은 공개
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // DB에서 최근 문의 내역 가져오기
  useEffect(() => {
    const fetchRecentInquiries = async () => {
      setIsLoadingInquiries(true);
      try {
        const { data, error } = await supabase
          .from('contacts')
          .select('id, name, email, service, message, created_at')
          .eq('isPrivate', false)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching recent inquiries:', error);
          setIsLoadingInquiries(false);
          return;
        }

        if (data) {
          const formattedData: RecentInquiry[] = data.map((item) => ({
            id: item.id,
            name: maskName(item.name),
            email: maskEmail(item.email),
            service: serviceMap[item.service] || item.service,
            message: item.message,
            date: new Date(item.created_at).toISOString().split('T')[0],
          }));
          setRecentInquiries(formattedData);
        }
        setIsLoadingInquiries(false);
      } catch (error) {
        console.error('Error fetching recent inquiries:', error);
        setIsLoadingInquiries(false);
      }
    };

    fetchRecentInquiries();
  }, []);

  // 캐러셀 자동 슬라이드
  useEffect(() => {
    if (recentInquiries.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentInquiries.length);
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [recentInquiries.length]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
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
    if (value.length > 7) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    // value.length <= 3일 때는 그대로 유지
    
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '제출 중 오류가 발생했습니다.');
      }

      // 성공 시 폼 초기화
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        timeline: '',
        message: '',
        isPrivate: true,
      });
      setErrors({});
      setSubmitStatus('success');

      // 최근 문의 내역 새로고침
      const { data: newData, error: fetchError } = await supabase
        .from('contacts')
        .select('id, name, email, service, message, created_at')
        .eq('is_private', false)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!fetchError && newData) {
        const formattedData: RecentInquiry[] = newData.map((item) => ({
          id: item.id,
          name: maskName(item.name),
          email: maskEmail(item.email),
          service: serviceMap[item.service] || item.service,
          message: item.message,
          date: new Date(item.created_at).toISOString().split('T')[0],
        }));
        setRecentInquiries(formattedData);
        setCurrentIndex(0); // 새 데이터로 인덱스 리셋
      }

      // 성공 메시지는 계속 유지 (사용자가 폼을 다시 제출하거나 페이지를 새로고침할 때까지)
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setErrors({
        submit: error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="mx-auto min-h-screen w-full px-6 pb-10 pt-10 sm:px-10">
      <div className="mb-12">
        <div className="flex items-end justify-between gap-4">
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
            <span className="font-sans text-base font-medium text-black transition-colors duration-300 group-hover:text-blue-600 sm:text-lg lg:text-2xl">
              Go to Home
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-transparent transition-colors duration-300 group-hover:bg-black sm:h-10 sm:w-10 lg:h-12 lg:w-12">
              <ArrowUpRight className="h-3 w-3 transition-colors duration-300 group-hover:text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Contact Form - 모바일에서 첫 번째로 표시 */}
        <div className="order-1 lg:order-1 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <label
                    htmlFor="name"
                    className="w-full shrink-0 text-sm font-semibold text-slate-700 sm:w-24"
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
                    <div className="w-full shrink-0 sm:w-24" />
                    <p className="text-xs text-red-500">{errors.name}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <label
                    htmlFor="email"
                    className="w-full shrink-0 text-sm font-semibold text-slate-700 sm:w-24"
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
                    <div className="w-full shrink-0 sm:w-24" />
                    <p className="text-xs text-red-500">{errors.email}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <label
                  htmlFor="phone"
                  className="w-full shrink-0 text-sm font-semibold text-slate-700 sm:w-24"
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <label className="w-full shrink-0 text-sm font-semibold text-slate-700 sm:w-24">
                    서비스 종류 *
                  </label>
                  <div className="flex flex-1 flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
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
                    <div className="w-full shrink-0 sm:w-24" />
                    <p className="text-xs text-red-500">{errors.service}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <label
                  htmlFor="timeline"
                  className="w-full shrink-0 text-sm font-semibold text-slate-700 sm:w-24"
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                  <label
                    htmlFor="message"
                    className="w-full shrink-0 pt-2 text-sm font-semibold text-slate-700 sm:w-24"
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
                    <div className="w-full shrink-0 sm:w-24" />
                    <p className="text-xs text-red-500">{errors.message}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex w-full flex-col items-end gap-2">
                {submitStatus === 'success' && (
                  <p className="text-sm text-green-600">문의가 성공적으로 접수되었습니다. 최대한 빠르게 회신드리겠습니다 😁</p>
                )}
                {errors.submit && (
                  <p className="text-sm text-red-500">{errors.submit}</p>
                )}
                <div className="flex w-full items-center justify-end gap-6">
                  <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      name="isPrivate"
                      checked={formData.isPrivate}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, isPrivate: !e.target.checked }));
                      }}
                      className="h-4 w-4 shrink-0 cursor-pointer border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                    />
                    <span className="text-sm text-slate-700">비공개</span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? '제출 중...' : '문의하기'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information & Recent Inquiries - 모바일에서 두 번째와 세 번째로 표시, 데스크톱에서는 오른쪽 컬럼 */}
        <div className="order-1 lg:order-2 lg:col-span-1 flex flex-col">
          <div className="flex flex-col flex-1">
            {/* 최근 문의 내용 카드 - 모바일에서 세 번째로 표시 */}
            <div className="order-1 lg:order-2 rounded-2xl p-6 sm:p-8 flex flex-col flex-1">
              <div className="relative w-full flex-1 overflow-hidden">
                {isLoadingInquiries ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-slate-400">최근 문의 내역을 불러오는 중 입니다.</p>
                  </div>
                ) : recentInquiries.length > 0 ? (
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
                        {/* <div>
                          <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            {inquiry.service}
                          </span>
                        </div> */}
                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-slate-400">최근 문의 내역을 불러오는 중 입니다.</p>
                  </div>
                )}
              </div>
              {/* 인디케이터 */}
              <div className="mt-4 flex justify-center gap-2 shrink-0">
                {recentInquiries.length > 0 && recentInquiries.map((_, index) => (
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
            {/* Contact Information - 모바일에서 두 번째 */}
            <div className="order-2 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-4">
                {/* 대표자 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-start justify-start pt-0.5">
                    <Image
                      src="/images/favicon.ico"
                      alt="Favicon"
                      width={24}
                      height={24}
                      className="h-7 w-7"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">대표자</h3>
                    <p className="text-slate-700">변진영</p>
                  </div>
                </div>
                {/* Divider */}
                <div className="mx-auto w-48 border-t border-slate-200"></div>
                {/* 전화번호 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-start justify-start pt-0.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900">
                      <Phone className="h-3 w-3 text-white" />
                    </div>
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
                {/* Divider */}
                <div className="mx-auto w-48 border-t border-slate-200"></div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-start justify-start pt-0.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900">
                      <Mail className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">이메일</h3>
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
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default ContactPage;

