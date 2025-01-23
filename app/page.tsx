import CatchPhraseSection from './components/CatchPhraseSection';
import Footer from './components/Footer';
import TitleSection from './components/TitleSection';

export default function Home() {
  return (
    <div>
      <main className="pt-10">
        <TitleSection />
        <CatchPhraseSection />
      </main>
      <Footer />
    </div>
  );
}
