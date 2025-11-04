import { StaticImageData } from 'next/image';

import appImage from '../assets/images/app-domain.png';
import graphicImage from '../assets/images/graphic-domain.png';
import strategyImage from '../assets/images/strategy-domain.png';
import webImage from '../assets/images/web-domain.png';

export type DomainCardInfo = {
  title: string;
  thumbnail: StaticImageData;
  description: string;
};

export const domainCards: DomainCardInfo[] = [
  {
    title: 'Web Design &\nDevelopment',
    thumbnail: webImage,
    description:
      '개념 설정부터 배포·유지보수까지 매끄러운 웹 개발 프로세스를 제공합니다. 고객 맞춤형 고품질 디지털 솔루션으로 성장과 사용자 참여를 극대화합니다.',
  },
  {
    title: 'App Design &\nDevelopment',
    thumbnail: appImage,
    description:
      '네이티브 앱과 IOS와 안드로이드 모두를 위한 크로스플랫폼 앱을 디자인부터 기획 개발까지 올인원 솔루션으로 제공합니다.',
  },
  {
    title: 'Graphic\nDesign',
    thumbnail: graphicImage,
    description:
      '브랜드 아이덴티티부터 UI/UX까지 매끄러운 그래픽 디자인 솔루션을 제공합니다. 감각적인 디자인으로 브랜드 가치를 극대화합니다.',
  },
  // {
  //   title: 'Business Strategy',
  //   thumbnail: strategyImage,
  //   description:
  //     '회사소개서 제작, 지원사업 합격 컨설팅, BM(비즈니스 모델) 설계까지 비즈니스 전략 전반에 걸쳐 종합적인 지원을 제공합니다.',
  // },
];
