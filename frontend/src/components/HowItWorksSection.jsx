const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    desc: 'Sign up in 30 seconds with just your email. No credit card required to get started.',
    icon: '👤',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
  },
  {
    number: '02',
    title: 'Choose Your Course',
    desc: 'Browse our curated batches for JEE, NEET, UPSC & Boards. Pick what suits your goal.',
    icon: '📖',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
  },
  {
    number: '03',
    title: 'Start Mastering',
    desc: 'Access mock tests, video lectures, analytics dashboards, and track your progress daily.',
    icon: '🚀',
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-28 bg-white relative overflow-hidden" id="how-it-works">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="text-center max-w-[650px] mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accentPrimary/5 border border-accentPrimary/10 rounded-full text-[0.8rem] font-bold text-accentPrimary mb-6 uppercase tracking-widest">
            ✦ How It Works
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-5 tracking-tight">
            Start learning in
            <br />
            <span className="gradient-text">three simple steps</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            No complicated onboarding. No hidden fees. Just sign up and start preparing for your dream exam.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-blue-200 via-emerald-200 to-purple-200 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              {/* Step Circle */}
              <div className={`w-32 h-32 rounded-3xl ${step.bgLight} flex items-center justify-center text-5xl mb-8 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative`}>
                {step.icon}
                {/* Number badge */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-black flex items-center justify-center shadow-lg`}>
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-[0.95rem] leading-relaxed max-w-[280px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
