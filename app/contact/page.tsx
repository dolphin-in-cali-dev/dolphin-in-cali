import { Mail, MapPin, Phone } from 'lucide-react';
import { Metadata } from 'next';

import { CS_EMAIL } from '@/constants/basic';

export const metadata: Metadata = {
  title: 'Contact',
};

const ContactPage = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-6 pb-20 pt-10 sm:px-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-7xl">
          Contact Us
        </h1>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg lg:text-xl">
          프로젝트 문의나 협업 제안은 언제든지 환영합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="rounded-2xl bg-slate-50 p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              연락처 정보
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">Email</h3>
                  <a
                    href={`mailto:${CS_EMAIL}`}
                    className="text-blue-600 hover:underline"
                  >
                    {CS_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">전화번호</h3>
                  <a
                    href="tel:010-5923-3761"
                    className="text-slate-700 hover:text-slate-900"
                  >
                    010-5923-3761
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">대표자</h3>
                  <p className="text-slate-700">변진영</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
              서비스 문의
            </h3>
            <p className="mb-4 text-sm text-slate-700 sm:text-base">
              웹/앱 개발, 그래픽 디자인, 비즈니스 전략 컨설팅 등 다양한 서비스에
              대해 문의하세요.
            </p>
            <a
              href={`mailto:${CS_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 sm:text-base"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              이메일 보내기
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
            빠른 문의
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                서비스 종류
              </label>
              <select
                id="service"
                name="service"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">선택해주세요</option>
                <option value="web">웹 개발</option>
                <option value="app">앱 개발</option>
                <option value="design">그래픽 디자인</option>
                <option value="strategy">비즈니스 전략</option>
                <option value="etc">기타</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                문의 내용 *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="프로젝트에 대해 자세히 설명해주세요..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-6 py-4 text-base font-semibold text-white transition-all hover:bg-slate-800 sm:text-lg"
            >
              문의하기
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;

