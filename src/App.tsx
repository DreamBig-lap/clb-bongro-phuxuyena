import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ScheduleSection from '@/components/ScheduleSection';
import RosterSection from '@/components/RosterSection';
import GallerySection from '@/components/GallerySection';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ScheduleSection />
        <RosterSection />
        <GallerySection />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
