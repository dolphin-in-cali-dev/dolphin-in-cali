import Image from 'next/image';

import { CS_EMAIL } from '@/constants/basic';

const RoofTopPage = () => {
  return (
    <main
      className="relative mx-auto w-full overflow-x-hidden pt-4 font-sans"
      style={{ backgroundColor: 'black' }}
    >
      <div className="relative h-[50vh] w-screen sm:h-[60vh] md:h-[80vh]">
        <video
          autoPlay
          loop
          muted
          className="h-full w-screen object-cover object-bottom"
        >
          <source src="/video/RoofTop_Intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-8 flex h-1 w-full items-center justify-center">
          <Image
            src="/images/RoofTop-Icon.svg"
            alt="RoofTop_Icon"
            width={40}
            height={40}
          />
          <h1 className="text-base font-black tracking-[1px] text-white lg:text-xl">
            ROOFTOP
          </h1>
          <a
            href={`mailto:${CS_EMAIL}`}
            className="button absolute right-6 flex items-center rounded-full bg-white p-2 hover:bg-gray-300 lg:right-10 lg:p-3"
          >
            <span className="text-[9px] font-semibold text-black lg:text-xs">
              Contact For Business
            </span>
          </a>
        </div>
        <div className="absolute bottom-0 flex h-1/3 w-screen items-end justify-center bg-gradient-to-t from-black to-transparent pb-12">
          <div className="mx-auto w-full max-w-[1200px] flex-col items-center space-y-2">
            <h1 className="text-center text-xs font-normal text-gray-300 lg:text-base">
              브랜드 맞춤형 AI 기반 인터랙티브 전시 소프트웨어
            </h1>
            <h1 className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-center text-3xl font-semibold text-transparent lg:text-5xl">
              AI-Generated
              <br /> Interactive Exhibition SoftWare
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-48">
        <h1 className="mt-7 break-keep bg-gradient-to-r from-white via-white to-black bg-clip-text text-center text-2xl text-[#FFF] text-transparent lg:text-3xl">
          &ldquo;
          <span className="font-semibold">
            AI CUSTOMIZATION
            <span className="block lg:hidden">+</span>
            <span className="hidden lg:inline"> + </span>
          </span>
          <span className="font-semibold">
            <span className="block lg:inline">REAL TIME MEDIA ART&rdquo;</span>
          </span>
        </h1>
        <h1 className="mt-2 text-center text-xs font-medium text-gray-300 lg:mt-3 lg:text-base">
          &ldquo;AI 기반으로 디자인하고, 가상 공간에서 체험하며,{' '}
          <span className="block lg:hidden"> </span>브랜드와 소통하는 새로운
          방식의 패션 & 예술 경험. &rdquo;
        </h1>

        <button className="mx-auto mt-48 flex flex-col rounded-full bg-gray-800 px-5 py-1 text-center text-xs font-semibold text-white shadow-md hover:bg-gray-900 lg:text-sm">
          서비스 소개
        </button>

        <h1 className="mt-4 text-center text-base font-medium text-gray-100 lg:text-2xl">
          <span className="font-bold">① 리얼타임</span> 아바타 커스텀
        </h1>
        <hr className="mx-auto mt-4 w-full max-w-[400px] border-white lg:max-w-[800px]" />
        <div className="flex justify-center px-8 pt-4 lg:pt-8">
          <Image
            src="/images/RoofTop_1.png"
            alt="RoofTop_1"
            width={800}
            height={600}
            className="h-full w-full max-w-[800px] object-cover"
          />
        </div>
        <h1 className="mt-2 text-center text-xs font-normal text-gray-300 lg:mt-10 lg:text-xl">
          의상 입히기, 재질 설정, 악세사리 등 수많은 기능들을 포함한 리얼타임
          아바타 커스텀
        </h1>

        <h1 className="mt-20 text-center text-base font-medium text-gray-100 lg:mt-20 lg:text-2xl">
          <span className="font-bold">② 생성형 AI 기반</span> 아바타 커스텀
        </h1>
        <hr className="mx-auto mt-4 w-full max-w-[400px] border-white lg:max-w-[800px]" />
        <div className="flex w-full flex-col">
          <div className="mx-auto flex w-full max-w-[1400px] flex-row items-center justify-center px-5 pt-4 lg:pt-8">
            <div className="mb-20 flex flex-col pr-20 lg:pr-40">
              <Image
                src="/images/RoofTop_2.png"
                alt="RoofTop_Example"
                width={600}
                height={600}
                className="w-full max-w-[600px] object-contain"
              />
              <h1 className="mt-2 text-center text-xs font-semibold text-gray-300 lg:text-base">
                AI 이미지 스타일 선택 및 사용자 프롬프트 입력
              </h1>
            </div>
            <div className="-ml-20 flex flex-col">
              <Image
                src="/images/RoofTop_3.png"
                alt="RoofTop_Example"
                width={300}
                height={300}
                className="relative z-10 w-full max-w-[300px]"
              />
              <h1 className="mt-2 text-center text-xs font-semibold text-gray-300 lg:text-base">
                실시간 이미지 생성 및 아바타 옷 패턴 반영
              </h1>
            </div>
          </div>

          <h1 className="mt-2 text-center text-xs font-normal text-gray-300 lg:mt-10 lg:text-xl">
            사용자의 프롬프팅에 따른 AI 이미지 생성 및 실시간 아바타 옷 패턴
            반영
          </h1>
        </div>

        <h1 className="mt-20 text-center text-base font-medium text-gray-100 lg:mt-20 lg:text-2xl">
          ③ 디자인한 아바타의{' '}
          <span className="font-bold">리얼타임 고퀄리티 미디어 아트진행</span>
        </h1>
        <hr className="mx-auto mt-4 w-full max-w-[400px] border-white lg:max-w-[800px]" />
        <div className="flex justify-center px-5 pt-4 lg:pt-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[800px] rounded-[20px]"
          >
            <source src="/video/RoofTop_beach.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <button className="mx-auto mt-48 flex flex-col rounded-full bg-gray-800 px-5 py-1 text-center text-xs font-semibold text-white shadow-md hover:bg-gray-900 lg:text-sm">
        진행과정
      </button>
      <h1 className="mt-3 text-center text-2xl text-white lg:mt-7 lg:text-3xl">
        <span className="font-semibold">브랜드를 위한 맞춤형 </span> 서비스 제작
      </h1>
      <h1 className="mt-3 text-center text-xs font-medium text-gray-300 lg:text-base">
        디지털 패션과 인터랙티브 미디어 아트의 혁신 AI 기반으로 디자인하고,{' '}
        <span className="block lg:hidden"> </span>가상 공간에서 체험하며,
        브랜드와 소통하는 새로운 방식의 패션 & 예술 경험.
      </h1>

      <h1 className="mt-20 text-center text-lg font-medium text-gray-300">
        브랜드 컨셉을 반영한 테마와 UI 제작
      </h1>
      <hr className="mx-auto mt-4 w-full max-w-[400px] border-white lg:max-w-[800px]" />
      <div className="mx-auto flex w-full max-w-[1400px] flex-row items-start justify-center space-x-10 px-5 pt-10">
        <div className="flex flex-col">
          <Image
            src="/images/RoofTop_GameStyle.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className="mt-2 text-center text-xs font-semibold text-gray-400 lg:text-base">
            Game Style 예시
          </h1>
        </div>
        <div className="flex flex-col">
          <Image
            src="/images/RoofTop_1.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className="mt-2 text-center text-xs font-semibold text-gray-400 lg:text-base">
            Beach Style 예시
          </h1>
        </div>
      </div>
      <h1 className="mt-20 text-center text-lg font-medium text-gray-300">
        브랜드 제품 스타일을 반영한 베이스 옷 및 패턴 제작
      </h1>
      <hr className="mx-auto mt-4 w-full max-w-[400px] border-white lg:max-w-[800px]" />
      <div className="mx-auto flex w-full max-w-[1400px] flex-row items-start justify-center space-x-10 px-5 pt-10">
        <div className="flex flex-col">
          <Image
            src="/images/RoofTop_BrandStyle_1.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className="mt-2 text-center text-xs font-semibold text-gray-400 lg:text-base">
            베이스 옷 제작
          </h1>
        </div>
        <div className="flex flex-col">
          <Image
            src="/images/RoofTop_BrandStyle_2.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className="mt-2 text-center text-xs font-semibold text-gray-400 lg:text-base">
            AI 이미지 스타일 및 고유 패턴 적용
          </h1>
        </div>
      </div>

      <h1 className="mt-20 text-center text-lg font-medium text-gray-300">
        브랜드 컨셉에 맞는 쇼케이스 연출
      </h1>
      <hr className="mx-auto mt-4 w-full max-w-[400px] border-white lg:max-w-[800px]" />
      <div className="mx-auto flex w-full max-w-[1400px] flex-row items-start justify-center space-x-10 px-5 pt-10">
        <div className="flex flex-col">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[600px] rounded-[5px]"
          >
            <source src="/video/RoofTop_Light.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className="mt-2 text-center text-xs font-semibold text-gray-400 lg:text-base">
            무대 컨셉
          </h1>
        </div>
        <div className="flex flex-col">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[600px] rounded-[5px]"
          >
            <source src="/video/RoofTop_Run.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className="mt-2 text-center text-xs font-semibold text-gray-400 lg:text-base">
            런웨이 패션쇼 컨셉
          </h1>
        </div>
      </div>
      <h1 className="mt-2 pt-4 text-center text-[9px] font-normal text-gray-400 lg:pt-10 lg:text-base">
        *본 영상은 미디어 아트의 예시이며 브랜드의 컨셉과 니즈에 따른 미디어
        아트 주문 제작을 진행합니다.
      </h1>
      <div className="mx-auto mb-40 mt-24 lg:mt-48 flex max-w-[1400px] flex-col items-center">
        <h1 className="text-center text-2xl text-white lg:mt-7 lg:text-3xl">
          더욱 더 사실적인 <span className="font-semibold">옷의 텍스쳐</span>
        </h1>
        <h1 className="mt-2 break-keep px-5 text-center text-xs font-normal text-gray-500 lg:mt-3 lg:text-base">
          단순 게임내 옷의 퀄리티가 아닌 실제 옷의 재질 상 구현을 위한 재질
          특성에 따른 주름 표면 재질 표현 및 사용자 커스텀 진행 중에도 확인이
          가능한 <br /> 리얼 타임 실감형 고퀄리티 의상을 3D SHOWROOM 에서 체험
        </h1>
        <Image
          src="/images/RoofTop_Cloth_Material.png"
          alt="RoofTop_Example"
          width={500}
          height={500}
          className="mt-5 w-full max-w-[1200px] px-5 lg:mt-10"
        />
      </div>
      <hr className="mx-auto mt-4 mb-8 lg:mb-10 w-full border-gray-500 lg:max-w-[1400px] px-10" />
      <div className='mx-auto flex flex-col w-full max-w-[1400px] item-center mb-20 px-5'>
      <h1 className='text-gray-200 text-[10px] lg:text-[12px] font-semibold'>© 2023 Dolphin In Cali. All rights reserved.</h1>
      <h1 className='text-gray-300 text-[10px] lg:text-[12px]'>contact : dolphinincali.dev@gmail.com</h1>
      </div>
    </main>
  );
};

export default RoofTopPage;
