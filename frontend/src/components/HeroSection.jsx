const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[80px] w-full max-w-[1200px] mx-auto px-8" id="home">
      {/* Background glowing orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(79,70,229,0.25)_0%,transparent_60%)] rounded-full -z-10 blur-[80px] animate-float-glow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(244,63,94,0.25)_0%,transparent_60%)] rounded-full -z-10 blur-[80px] animate-float-glow-reverse"></div>

      <div className="text-center max-w-[800px] relative z-10 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-[0.85rem] font-bold text-accentPrimary shadow-sm animate-fade-in-up">
          ✨ Welcome to the future of education
        </div>
        
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
          Manage Your School with <br />
          <span className="gradient-text">Absolute Precision</span>
        </h1>
        
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-textSecondary max-w-[600px] mx-auto animate-fade-in-up [animation-delay:200ms]">
          Parishram is an all-in-one, modern school management system designed to streamline administration, empower teachers, and engage students.
        </p>
        
        <div className="relative flex justify-center animate-fade-in-up [animation-delay:400ms] z-10 w-full mt-16 mb-8">
          <div className="relative w-full max-w-[800px] flex items-center justify-center group">
            {/* Soft, wide diffuse glow behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accentSecondary/40 via-purple-300/30 to-accentWarm/30 rounded-[2rem] blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* The flat, clean white card */}
            <div className="relative w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100/50 p-12 md:p-16 flex flex-col items-center justify-center z-10">
              
              <div className="mb-6 flex justify-center">
                <img 
                  src="/parishram-logo.png" 
                  alt="Parishram Logo" 
                  className="w-56 h-auto object-contain mix-blend-multiply"
                />
              </div>
              
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3 font-heading tracking-tight">Parishram Academy</h3>
              
              <p className="text-center text-gray-500 font-semibold leading-relaxed mb-8 text-[1.1rem]">
                Empowering Rural Dreams <br/>
                with <span className="text-accentPrimary">Quality Education</span>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-8">
                <a href="/login" className="w-full sm:flex-1 py-4 bg-accentPrimary hover:bg-accentPrimary/90 text-white font-bold rounded-2xl shadow-lg shadow-accentPrimary/20 transition-all text-center">
                  Start Learning Now
                </a>
                <a href="#courses" className="w-full sm:flex-1 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-2xl border border-gray-200 transition-all text-center">
                  Explore Courses
                </a>
              </div>

              <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-3 rounded-full border border-gray-100">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8eaf6] border-2 border-white flex items-center justify-center text-sm shadow-sm z-30">👨‍🎓</div>
                  <div className="w-10 h-10 rounded-full bg-[#e8f5e9] border-2 border-white flex items-center justify-center text-sm shadow-sm z-20">👩‍🎓</div>
                  <div className="w-10 h-10 rounded-full bg-[#fff3e0] border-2 border-white flex items-center justify-center text-sm shadow-sm z-10">👨‍🏫</div>
                </div>
                <span className="text-[0.95rem] font-bold text-gray-500 ml-2">Join 500+ Aspirants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
