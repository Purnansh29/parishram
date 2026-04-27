import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularCourses from '../components/PopularCourses';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bgPrimary">
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
        
        {/* Popular Courses Section */}
        <section className="py-20 bg-white" id="courses">
          <div className="max-w-[1200px] mx-auto px-8">
            <PopularCourses />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
