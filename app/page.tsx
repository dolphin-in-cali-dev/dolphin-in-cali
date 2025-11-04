import CaseStudySection from './components/CaseStudySection';
import CatchPhraseSection from './components/CatchPhraseSection';
import DomainSection from './components/DomainSection';
import Footer from './components/Footer';
import TitleSection from './components/TitleSection';
import ContactCard from './components/ContactCard';
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <main className="pt-2">
        <TitleSection />
        <CaseStudySection />
        <CatchPhraseSection />
        <DomainSection />
        <ContactCard />
      </main>
      <Footer />
    </div>
  );
}
