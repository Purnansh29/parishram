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
        
        <div className="flex items-center justify-center gap-4 mt-4 animate-fade-in-up [animation-delay:300ms]">
          <button className="px-8 py-3.5 rounded-full bg-accent-gradient text-white text-[1rem] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] cursor-pointer">Start Free Trial</button>
          <button className="px-8 py-3.5 rounded-full bg-transparent border border-borderColor text-textPrimary text-[1rem] font-semibold transition-all duration-300 hover:bg-white/5 hover:border-textSecondary cursor-pointer">View Demo</button>
        </div>

        {/* Abstract browser mockup of the dashboard */}
        <div className="mt-24 w-full max-w-[1000px] h-[250px] md:h-[400px] bg-bgSecondary border border-borderColor rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.35),0_0_50px_rgba(108,92,231,0.1)] animate-fade-in-up [animation-delay:500ms] relative overflow-hidden">
          <div className="h-10 bg-bgPrimary border-b border-borderColor flex items-center px-5 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#fd79a8]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffeaa7]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#55efc4]"></div>
          </div>
          <div className="p-8 flex gap-6 h-[calc(100%-40px)]">
            <div className="hidden md:block w-[200px] h-full bg-bgCard rounded-xl border border-borderColor"></div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full h-[150px] bg-bgCard rounded-xl border border-borderColor"></div>
              <div className="w-full h-[100px] bg-bgCard rounded-xl border border-borderColor"></div>
              <div className="w-full h-[100px] bg-bgCard rounded-xl border border-borderColor"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
