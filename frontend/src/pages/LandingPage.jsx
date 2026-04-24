import Navbar from '../components/LandingPage/Navbar/Navbar';
import HeroSection from '../components/LandingPage/HeroSection/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection/FeaturesSection';
import Footer from '../components/LandingPage/Footer/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
