import Image from 'next/image';
import { CS_EMAIL } from '@/constants/basic';

const RoofTopPage = () => {

  return (
    <main
      className="relative pt-4 mx-auto w-full font-sans overflow-x-hidden"
      style={{ backgroundColor: 'black' }}
    >
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[80vh] w-screen">
        <video
          autoPlay
          loop
          muted
          className="h-full w-screen object-cover object-bottom"
        >
          <source src="/video/RoofTop_Intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-8 w-full h-1 flex items-center justify-center">
          <Image
            src="/images/RoofTop-Icon.svg"
            alt="RoofTop_Icon"
            width={40}
            height={40}
          />
          <h1 className="text-base lg:text-xl font-black text-white tracking-[1px]">ROOFTOP</h1>
          <a
            href={`mailto:${CS_EMAIL}`}
            className="button absolute right-6 lg:right-10 flex items-center rounded-full bg-white p-2 lg:p-3 hover:bg-gray-300"
          >
            <span className="text-[9px] lg:text-xs font-semibold text-black ">Contact For Business</span>
          </a>

        </div>
        <div className="absolute bottom-0 w-screen h-1/3 bg-gradient-to-t from-black to-transparent flex items-end justify-center pb-12 ">
          <div className="mx-auto max-w-[1200px] flex-col w-full items-center space-y-2">
            <h1 className="text-center text-gray-300 text-xs lg:text-base font-normal">
              브랜드 맞춤형 AI  기반 인터랙티브 전시 소프트웨어
            </h1>
            <h1 className="text-center text-3xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-gray-500 via-white text-transparent bg-clip-text">
              AI-Generated<br /> Interactive Exhibition SoftWare
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-48">

        <h1 className='mt-7 text-[#FFF] text-center text-2xl lg:text-3xl bg-gradient-to-r from-white via-white to-black text-transparent bg-clip-text break-keep'>
          &ldquo;
          <span className='font-semibold'>
            AI CUSTOMIZATION
            <span className='block lg:hidden'>+</span>
            <span className='hidden lg:inline'> + </span>
          </span>
          <span className='font-semibold'>
            <span className='block lg:inline'>REAL TIME MEDIA ART&rdquo;</span>
          </span>

        </h1>
        <h1 className='mt-2 lg:mt-3 text-gray-300 text-center text-xs lg:text-base font-medium'>
          &ldquo;AI 기반으로 디자인하고, 가상 공간에서 체험하며, <span className='block lg:hidden'> </span>브랜드와 소통하는 새로운 방식의 패션 & 예술 경험.
          &rdquo;</h1>

        <button className="mt-48 text-center mx-auto flex flex-col rounded-full bg-gray-800 px-5  font-semibold text-white shadow-md hover:bg-gray-900  py-1 text-xs lg:text-sm">
          서비스 소개
        </button>

        <h1 className='mt-4 text-gray-100 text-center text-base lg:text-2xl font-medium'>
          <span className='font-bold'>① 리얼타임</span> 아바타 커스텀
        </h1>
        <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
        <div className='flex justify-center pt-4 px-8 lg:pt-8'>
          <Image
            src="/images/RoofTop_1.png"
            alt="RoofTop_1"
            width={800}
            height={600}
            className="w-full max-w-[800px] h-full object-cover"
          />
        </div>
        <h1 className='font-normal text-center text-xs lg:text-xl text-gray-300 mt-2 lg:mt-10'>
          의상 입히기, 재질 설정, 악세사리 등 수많은 기능들을 포함한 리얼타임 아바타 커스텀
        </h1>

        <h1 className='mt-20 lg:mt-20 text-gray-100 text-center text-base lg:text-2xl font-medium'>
          <span className='font-bold'>② 생성형 AI 기반</span> 아바타 커스텀
        </h1>
        <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
        <div className='flex flex-col w-full'>
          <div className='px-5 flex flex-row pt-4 lg:pt-8 items-center justify-center w-full mx-auto max-w-[1400px]'>
            <div className='mb-20 flex flex-col pr-20 lg:pr-40 '>
              <Image
                src="/images/RoofTop_2.png"
                alt="RoofTop_Example"
                width={600}
                height={600}
                className="max-w-[600px] w-full object-contain"
              />
              <h1 className='font-semibold text-center text-xs lg:text-base text-gray-300 mt-2'>
                AI 이미지 스타일 선택 및 사용자 프롬프트 입력
              </h1>
            </div>
            <div className='flex flex-col -ml-20'>
              <Image
                src="/images/RoofTop_3.png"
                alt="RoofTop_Example"
                width={300}
                height={300}
                className="max-w-[300px] w-full relative z-10"
              />
              <h1 className='font-semibold text-center text-xs lg:text-base text-gray-300 mt-2'>
                실시간 이미지 생성 및 아바타 옷 패턴 반영
              </h1>
            </div>
          </div>

          <h1 className='font-normal text-center text-xs lg:text-xl text-gray-300 mt-2 lg:mt-10'>
            사용자의 프롬프팅에 따른 AI 이미지 생성 및 실시간 아바타 옷 패턴 반영
          </h1>

        </div>


        <h1 className='mt-20 lg:mt-20 text-gray-100 text-center text-base lg:text-2xl font-medium'>
          ③ 디자인한 아바타의 <span className='font-bold'>리얼타임 고퀄리티 미디어 아트진행</span>
        </h1>
        <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
        <div className='flex justify-center pt-4 px-5 lg:pt-8'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full max-w-[800px] rounded-[20px]'
          >
            <source src="/video/RoofTop_beach.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>

      <button className="mt-48 text-center mx-auto flex flex-col rounded-full bg-gray-800 px-5  font-semibold text-white shadow-md hover:bg-gray-900  py-1 text-xs lg:text-sm">
        진행과정
      </button>
      <h1 className='mt-3 lg:mt-7 text-center text-2xl lg:text-3xl text-white'>
        <span className='font-semibold'>브랜드를 위한 맞춤형 </span> 서비스 제작
      </h1>
      <h1 className='mt-3 text-gray-300 text-center text-xs lg:text-base font-medium'>
        디지털 패션과 인터랙티브 미디어 아트의 혁신
        AI 기반으로 디자인하고, <span className='block lg:hidden'> </span>가상 공간에서 체험하며, 브랜드와 소통하는 새로운 방식의 패션 & 예술 경험.</h1>

      <h1 className='mt-20 text-gray-300 text-center text-lg font-medium'>
        브랜드 컨셉을 반영한 테마와 UI 제작
      </h1>
      <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
      <div className='px-5 flex flex-row pt-10 items-start justify-center w-full mx-auto max-w-[1400px] space-x-10'>
        <div className='flex flex-col'>
          <Image
            src="/images/RoofTop_GameStyle.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className='font-semibold text-center text-xs lg:text-base text-gray-400 mt-2'>
            Game Style 예시
          </h1>
        </div>
        <div className='flex flex-col'>
          <Image
            src="/images/RoofTop_1.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className='font-semibold text-center text-xs lg:text-base text-gray-400 mt-2'>
            Beach Style 예시
          </h1>
        </div>
      </div>
      <h1 className='mt-20 text-gray-300 text-center text-lg font-medium'>
        브랜드 제품 스타일을 반영한 베이스 옷 및 패턴 제작
      </h1>
      <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
      <div className='flex flex-row pt-10 items-start justify-center w-full mx-auto max-w-[1400px] space-x-10 px-5'>
        <div className='flex flex-col'>
          <Image
            src="/images/RoofTop_BrandStyle_1.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className='font-semibold text-center text-xs lg:text-base text-gray-400 mt-2'>
            베이스 옷 제작
          </h1>
        </div>
        <div className='flex flex-col'>
          <Image
            src="/images/RoofTop_BrandStyle_2.png"
            alt="RoofTop_Example"
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className='font-semibold text-center text-xs lg:text-base text-gray-400 mt-2'>
            AI 이미지 스타일 및 고유 패턴 적용
          </h1>
        </div>
      </div>

      <h1 className='mt-20 text-gray-300 text-center text-lg font-medium'>
        브랜드 컨셉에 맞는 쇼케이스 연출
      </h1>
      <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
      <div className='flex flex-row pt-10 items-start justify-center w-full mx-auto max-w-[1400px] space-x-10 px-5'>
        <div className='flex flex-col'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full max-w-[600px] rounded-[5px]'
          >
            <source src="/video/RoofTop_Light.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className='font-semibold text-center text-xs lg:text-base text-gray-400 mt-2'>
            무대 컨셉
          </h1>
        </div>
        <div className='flex flex-col'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full max-w-[600px] rounded-[5px]'
          >
            <source src="/video/RoofTop_Run.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className='font-semibold text-center text-xs lg:text-base text-gray-400 mt-2'>
            런웨이 패션쇼 컨셉
          </h1>
        </div>
      </div>
      <h1 className='pt-4 lg:pt-10 font-normal text-center text-gray-400 mt-2  text-[9px] lg:text-base'>
        *본 영상은 미디어 아트의 예시이며 브랜드의 컨셉과 니즈에 따른 미디어 아트 주문 제작을 진행합니다.
      </h1>
      <div className='mx-auto mt-48 flex flex-col max-w-[1400px] items-center mb-40'>
        <h1 className='lg:mt-7 text-center text-2xl lg:text-3xl text-white'>
        더욱 더 사실적인 <span className='font-semibold'>옷의 텍스쳐</span>
        </h1>
        <h1 className='mt-2 lg:mt-3 text-gray-500 text-center text-xs lg:text-base font-normal px-5 
        break-keep'>
          단순 게임내 옷의 퀄리티가 아닌 실제 옷의 재질 상 구현을 위한 재질 특성에 따른 주름 표면 재질 표현 및 사용자 커스텀 진행 
          중에도 확인이 가능한 <br /> 리얼
          타임 실감형 고퀄리티 의상을 3D SHOWROOM
          에서 체험
        </h1>
        <Image
          src="/images/RoofTop_Cloth_Material.png"
          alt="RoofTop_Example"
          width={500}
          height={500}
          className="max-w-[1200px] w-full mt-5 lg:mt-10 px-5"
        />
        
      </div>

    </main>
  );
};

export default RoofTopPage;