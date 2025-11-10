import pickForThumbnail from '@assets/images/pick-for-thumbnail.png';
import robotDiveThumbnail from '@assets/images/robot-dive-thumbnail.png';
import sincereFlowerThumbnail from '@assets/images/sincere-flower-thumbnail.png';

import isaThumbnail from '@assets/images/isa-thumbnail.png';
import cutpleThumbnail from '@assets/images/cutple-thumbnail.png';    
import jndThumbnail from '@assets/images/jnd-thumbnail.png';
import noaThumbnail from '@assets/images/noa-thumbnail.png';
import rooftopThumbnail from '@assets/images/rooftop-thumbnail.png';
import hiKThumbnail from '@assets/images/hiK-thumbnail.png';
import dolphinAIThumbnail from '@assets/images/dolphin-ai-thumbnail.png';
import sideIndexerThumbnail from '@assets/images/sideindexer-thumbnail.png';

import { StaticImageData } from 'next/image';

export type CaseStudyInfo = {
  title: string;
  thumbnail: StaticImageData | string;
  tags: string[];
  path: string;
  isFeatured?: boolean;
};

export const caseStudyItems: CaseStudyInfo[] = [
  // {
  //   title: 'S2D Lab',
  //   thumbnail: 'https://picsum.photos/401',
  //   tags: ['Web', 'Dev & Design'],
  //   path: 'case-study/s2d-lab',
  //   isFeatured: false,
  // },
  {
    title: '픽포',
    thumbnail: pickForThumbnail,
    tags: ['App', 'Dev & Design'],
    path: 'case-study/pickfor',
    isFeatured: true,
  },
  {
    title: 'Rooftop Project',
    thumbnail: rooftopThumbnail,
    tags: ['AI', '3D Graphics', 'Dev & Design'],
    path: 'rooftop',
    isFeatured: false,
  },
  // {
  //   title: 'EDEN WOLRD',
  //   thumbnail: 'https://picsum.photos/404',
  //   tags: ['Web', 'Development'],
  //   path: 'case-study/eden-world',
  //   isFeatured: false,
  // },
  {
    title: '로봇다이브',
    thumbnail: robotDiveThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'https://www.allrobotai.com/',
    isFeatured: true,
  },
  // {
  //   title: '아트리어',
  //   thumbnail: 'https://picsum.photos/406',
  //   tags: ['Consulting', 'Design'],
  //   path: 'case-study/artreer',
  //   isFeatured: false,
  // },
  {
    title: '진심꽃방 오브제',
    thumbnail: sincereFlowerThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'case-study/objet-sincerity',
    isFeatured: false,
  },
  // {
  //   title: '닿기를',
  //   thumbnail: 'https://picsum.photos/408',
  //   tags: ['Web', 'Dev & Design'],
  //   path: 'case-study/toreachu',
  //   isFeatured: false,
  // },
  {
    title: '으랏차라 이사',
    thumbnail: isaThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'https://www.euratchacha24.com/',
    isFeatured: true,
  },
  {
    title: '노아인테리어',
    thumbnail: noaThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'https://noahint.imweb.me/',
    isFeatured: false,
  },
  {
    title: '컷플',
    thumbnail: cutpleThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'https://www.cutple.com/',
    isFeatured: true,
  },
  {
    title: '제이엔디써키트',
    thumbnail: jndThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'https://www.jndcircuit.co.kr/',
    isFeatured: true,
  },
  {
    title: 'Hi-K',
    thumbnail: hiKThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'https://www.hik.co.kr/',
    isFeatured: false,
  },
  {
    title: '돌핀인캘리 AI',
    thumbnail: dolphinAIThumbnail,
    tags: ['Web', 'AI'],
    path: 'https://www.dolphin-in-cali-ai.com/',
    isFeatured: false,
  },
  {
    title: 'Side Indexer',
    thumbnail: sideIndexerThumbnail,
    tags: ['Web Extension', 'AI'],
    path: 'https://sideindexer.com/',
    isFeatured: false,
  }
];


  // axionppt, HAMO
