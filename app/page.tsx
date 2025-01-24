import CatchPhraseSection from './components/CatchPhraseSection';
import DomainSection from './components/DomainSection';
import Footer from './components/Footer';
import TitleSection from './components/TitleSection';

export default function Home() {
  return (
    <div>
      <main className="pt-10">
        <TitleSection />
        <DomainSection />
        <CatchPhraseSection />
      </main>
      <Footer />
    </div>
  );
}
