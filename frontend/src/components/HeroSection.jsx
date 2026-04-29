import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[80px]" id="home">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_60%)] rounded-full -z-10 blur-[80px] animate-float-glow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(244,63,94,0.15)_0%,transparent_60%)] rounded-full -z-10 blur-[80px] animate-float-glow-reverse"></div>
      <div className="absolute top-[30%] right-[10%] w-[25%] h-[30%] bg-[radial-gradient(circle,rgba(129,140,248,0.12)_0%,transparent_60%)] rounded-full -z-10 blur-[60px] animate-float-glow"></div>

      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-accentPrimary/5 border border-accentPrimary/15 rounded-full text-[0.85rem] font-bold text-accentPrimary w-fit mx-auto lg:mx-0 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse"></span>
              India's Most Affordable EdTech Platform
            </div>
            
            <h1 className="text-[clamp(2.5rem,5.5vw,4.2rem)] font-extrabold tracking-tight leading-[1.1] animate-fade-in-up [animation-delay:100ms]">
              Quality Education
              <br />
              <span className="gradient-text">Without the</span>
              <br />
              <span className="gradient-text">Heavy Price Tag</span>
            </h1>
            
            <p className="text-lg text-gray-500 max-w-[520px] leading-relaxed mx-auto lg:mx-0 animate-fade-in-up [animation-delay:200ms]">
              Parishram empowers low-income students with premium mock tests, deep analytics, and quality content — all starting at just <span className="font-bold text-accentPrimary">₹499</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up [animation-delay:300ms]">
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-accentPrimary hover:bg-accentPrimary/90 text-white font-bold rounded-2xl shadow-lg shadow-accentPrimary/25 transition-all hover:shadow-xl hover:shadow-accentPrimary/30 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
                Start Learning Free
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a href="#courses" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-200 transition-all hover:-translate-y-0.5 text-center">
                Explore Courses
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-5 animate-fade-in-up [animation-delay:400ms] mx-auto lg:mx-0">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-[3px] border-white flex items-center justify-center text-sm shadow-md z-30 text-white font-bold">A</div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-[3px] border-white flex items-center justify-center text-sm shadow-md z-20 text-white font-bold">R</div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-[3px] border-white flex items-center justify-center text-sm shadow-md z-10 text-white font-bold">S</div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-[3px] border-white flex items-center justify-center text-[10px] shadow-md z-0 text-white font-bold">+2K</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {'★★★★★'.split('').map((star, i) => <span key={i} className="text-sm">{star}</span>)}
                </div>
                <p className="text-sm font-bold text-gray-500">Trusted by <span className="text-gray-800">2,500+</span> Students</p>
              </div>
            </div>
          </div>

          {/* Right - Hero Card */}
          <div className="relative flex justify-center animate-fade-in-up [animation-delay:400ms]">
            <div className="relative w-full max-w-[480px] group">
              {/* Glow behind card */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accentPrimary/20 via-purple-300/15 to-accentWarm/15 rounded-[2.5rem] blur-[50px] opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-gray-100/80 p-10 flex flex-col items-center z-10">
                
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                  <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-accentPrimary/10 to-accentSecondary/10 border border-accentPrimary/10 flex items-center justify-center p-4">
                    <img 
                      src="/parishram-logo.png" 
                      alt="Parishram Logo" 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-heading tracking-tight">Parishram Academy</h3>
                <p className="text-center text-gray-400 font-medium text-sm mb-8">प्रणोदेवी सरस्वती</p>

                {/* Stats Row */}
                <div className="w-full grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-blue-50/80 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-accentPrimary">50+</p>
                    <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Courses</p>
                  </div>
                  <div className="bg-emerald-50/80 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-emerald-600">2.5K</p>
                    <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Students</p>
                  </div>
                  <div className="bg-amber-50/80 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-amber-600">95%</p>
                    <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Results</p>
                  </div>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {['JEE', 'NEET', 'UPSC', 'Boards'].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-100 hover:border-accentPrimary/30 hover:bg-accentPrimary/5 hover:text-accentPrimary transition-all cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating Badge - Top Right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-100 px-4 py-3 z-20 animate-bounce [animation-duration:3s]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase">Starting at</p>
                    <p className="text-base font-black text-accentPrimary">₹499</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Bottom Left */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-100 px-4 py-3 z-20 animate-bounce [animation-duration:4s] [animation-delay:1s]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase">Analytics</p>
                    <p className="text-base font-black text-emerald-600">Real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
