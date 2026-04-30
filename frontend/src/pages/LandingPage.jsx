import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularCourses from '../components/PopularCourses';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'JEE Aspirant, Class 12',
    text: 'Parishram helped me improve my Physics score from 45% to 82% in just 3 months. The analytics showed me exactly where I was weak.',
    avatar: 'RS',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Priya Gupta',
    role: 'NEET Aspirant, Dropper',
    text: 'At ₹499, this is the best investment I have made. The mock tests are on par with top coaching institutes like Allen and Aakash.',
    avatar: 'PG',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Amit Kumar',
    role: 'UPSC Foundation',
    text: 'The subject-wise breakdown and national ranking feature keeps me motivated. I can finally afford quality test preparation.',
    avatar: 'AK',
    color: 'from-amber-400 to-orange-500',
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bgPrimary">
      <SEO title="Parishram" description="Parishram – Affordable EdTech platform for JEE, NEET & UPSC aspirants. Smart mock tests, video lectures, analytics, and doubt-solving at just ₹499." />
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
        
        {/* Popular Courses Section */}
        <section className="py-24 bg-gray-50/50" id="courses">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accentPrimary/5 border border-accentPrimary/10 rounded-full text-[0.8rem] font-bold text-accentPrimary mb-6 uppercase tracking-widest">
                ✦ Our Batches
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-4 tracking-tight">
                Courses built for <span className="gradient-text">every aspirant</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-lg mx-auto">Premium batches at prices that won't burden your family. Quality education is now within reach.</p>
            </div>
            <PopularCourses />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accentPrimary/5 border border-accentPrimary/10 rounded-full text-[0.8rem] font-bold text-accentPrimary mb-6 uppercase tracking-widest">
                ✦ Student Stories
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-4 tracking-tight">
                Loved by <span className="gradient-text">students across India</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-lg mx-auto">Real stories from real students who transformed their preparation with Parishram.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div key={idx} className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-gray-100/80 hover:-translate-y-1 transition-all duration-500">
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-400 mb-5">
                    {'★★★★★'.split('').map((star, i) => <span key={i} className="text-base">{star}</span>)}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-600 leading-relaxed mb-8 text-[0.95rem]">"{t.text}"</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
