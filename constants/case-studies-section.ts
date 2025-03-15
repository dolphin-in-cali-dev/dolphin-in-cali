import pickForThumbnail from '@assets/images/pick-for-thumbnail.png';
import robotDiveThumbnail from '@assets/images/robot-dive-thumbnail.png';
import sincereFlowerThumbnail from '@assets/images/sincere-flower-thumbnail.png';
import { StaticImageData } from 'next/image';

export type CaseStudyInfo = {
  title: string;
  thumbnail: StaticImageData | string;
  tags: string[];
  path: string;
};

export const caseStudyItems: CaseStudyInfo[] = [
  {
    title: 'S2D Lab',
    thumbnail: 'https://picsum.photos/401',
    tags: ['Web', 'Dev & Design'],
    path: 'case-study/s2d-lab',
  },
  {
    title: 'Rooftop Project',
    thumbnail: 'https://picsum.photos/402',
    tags: ['AI', '3D Graphics', 'Dev & Design'],
    path: 'case-study/rooftop-project',
  },
  {
    title: '픽포',
    thumbnail: pickForThumbnail,
    tags: ['App', 'Dev & Design'],
    path: 'case-study/pickfor',
  },
  {
    title: 'EDEN WOLRD',
    thumbnail: 'https://picsum.photos/404',
    tags: ['Web', 'Development'],
    path: 'case-study/eden-world',
  },
  {
    title: '로봇다이브',
    thumbnail: robotDiveThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'case-study/robot-dive',
  },
  {
    title: '아트리어',
    thumbnail: 'https://picsum.photos/406',
    tags: ['Consulting', 'Design'],
    path: 'case-study/artreer',
  },
  {
    title: '진심꽃방 오브제',
    thumbnail: sincereFlowerThumbnail,
    tags: ['Web', 'Dev & Design'],
    path: 'case-study/objet-sincerity',
  },
  {
    title: '닿기를',
    thumbnail: 'https://picsum.photos/408',
    tags: ['Web', 'Dev & Design'],
    path: 'case-study/toreachu',
  },
];
