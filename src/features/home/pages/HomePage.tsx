import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import WhatsAppPopup from '../../../components/layout/WhatsAppPopup';
import FloatingElements from '../../../components/layout/FloatingElements';
import { SectionId } from '../../../types/app';
import About from '../sections/About';
import Careers from '../sections/Careers';
import Contact from '../sections/Contact';
import Hero from '../sections/Hero';
import MenuPreview from '../sections/MenuPreview';
import Promotions from '../sections/Promotions';
import Reservation from '../sections/Reservation';

interface HomePageProps {
  onNavigate: (sectionId: SectionId) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-red-950 font-sans text-white">
      <Header onNavigate={onNavigate} />
      <main>
        <Hero onNavigate={onNavigate} />
        <About />
        <MenuPreview />
        <Promotions onNavigate={onNavigate} />
        <Careers />
        <Reservation />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
      <WhatsAppPopup />
    </div>
  );
};

export default HomePage;
