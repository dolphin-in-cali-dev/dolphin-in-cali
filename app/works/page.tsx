import { Metadata } from 'next';
import Image from 'next/image';

import { caseStudyCards } from '@/constants/case-studies-section';

export const metadata: Metadata = {
  title: 'Works',
};

const WorksPage = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-10 pb-20 pt-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 sm:text-6xl lg:text-7xl">
          Our Works
        </h1>
        <p className="mt-4 text-lg text-neutral-600 sm:text-xl">
          돌핀인캘리가 진행한 프로젝트들을 소개합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudyCards.map((project, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default WorksPage;

