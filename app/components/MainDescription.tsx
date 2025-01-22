import { Separator } from '@/components/ui/separator';

const MainDescription = () => {
  return (
    <div className="flex flex-col gap-y-20">
      <div className="flex items-end justify-between gap-x-20">
        <div className="flex flex-col gap-y-4">
          <p className="text-4xl leading-[48px] text-neutral-800">
            From Concept to Creation:
            <br />
            Comprehensive Digital Solution
          </p>
          <Separator className="bg-neutral-800" />
          <p className="text-xl text-neutral-800">
            아이디어에서 실행까지:
            <br />
            통합 디지털 솔루션
          </p>
        </div>
        <p className="text-right text-xl leading-7 text-neutral-600">
          돌핀인캘리는 단순히 아름답고 기능적인 웹앱을 만드는 것을 넘어,
          <br />
          효과적인 디지털 경험을 설계하는 데 중점을 둡니다.
          <br />
          우리는 고객의 성공을 곧 우리의 성공으로 여기며,
          <br />
          브랜드 기획에서 서비스 개발까지, 모든 과정을 깊이 있게 동행합니다.
        </p>
      </div>
      <span className="self-end text-neutral-500">
        WEBSITE © Copyright 2023 DOLPHIN IN CALI
      </span>
    </div>
  );
};

export default MainDescription;
