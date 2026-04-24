const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[80px] w-full max-w-[1200px] mx-auto px-8" id="home">
      {/* Background glowing orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(108,92,231,0.15)_0%,transparent_60%)] rounded-full -z-10 blur-[80px] animate-float-glow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(253,121,168,0.15)_0%,transparent_60%)] rounded-full -z-10 blur-[80px] animate-float-glow-reverse"></div>

      <div className="text-center max-w-[800px] relative z-10 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-bgGlass border border-borderColor rounded-full text-[0.85rem] font-medium text-accentSecondary backdrop-blur-[10px] animate-fade-in-up">
          ✨ Welcome to the future of education
        </div>
        
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
          Manage Your School with <br />
          <span className="gradient-text">Absolute Precision</span>
        </h1>
        
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-textSecondary max-w-[600px] mx-auto animate-fade-in-up [animation-delay:200ms]">
          Parishram is an all-in-one, modern school management system designed to streamline administration, empower teachers, and engage students.
        </p>
        
        <div className="relative flex justify-center animate-fade-in-up [animation-delay:400ms] z-10 w-full mt-10">
          <div className="w-full max-w-[400px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-accentPrimary/20 to-transparent rounded-[2rem] transform rotate-3 scale-105 blur-sm mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-white/40 rounded-[2rem] backdrop-blur-md border border-white/50 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              
              <div className="w-24 h-24 bg-accent-gradient rounded-full flex items-center justify-center text-5xl mb-6 shadow-lg animate-bounce-slow">
                🎓
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading tracking-tight">Parishram Academy</h3>
              <p className="text-center text-gray-600 font-medium leading-relaxed">
                Empowering Rural Dreams <br/>
                with <span className="text-accentPrimary">Quality Education</span>
              </p>
              
              <div className="mt-8 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs">👨‍🎓</div>
                  <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs">👩‍🎓</div>
                  <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xs">👨‍🏫</div>
                </div>
                <span className="text-sm font-bold text-gray-500 ml-2">Join 500+ Aspirants</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
