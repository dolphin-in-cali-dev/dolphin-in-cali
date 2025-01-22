import Footer from './components/Footer';
import TitleSection from './components/TitleSection';

export default function Home() {
  return (
    <div>
      <main className="mx-auto max-w-[1440px] px-10 pt-10">
        <TitleSection />
      </main>
      <Footer />
    </div>
  );
}
