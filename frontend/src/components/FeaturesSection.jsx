const featuresData = [
  {
    title: 'Smart Mock Tests',
    desc: 'AI-curated question papers that adapt to your level. Practice with real exam patterns for JEE, NEET & UPSC.',
    icon: '📝',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
  },
  {
    title: 'Deep Analytics',
    desc: 'Track your accuracy, speed, and weak areas with real-time performance dashboards and subject-wise breakdowns.',
    icon: '📊',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
  },
  {
    title: 'Affordable Pricing',
    desc: 'Premium content at 90% lower cost. Our mission is to make quality education accessible to every student in India.',
    icon: '💰',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
  {
    title: 'National Rankings',
    desc: 'Compare your performance against thousands of students nationwide. Know exactly where you stand before the real exam.',
    icon: '🏆',
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
  },
  {
    title: 'Video Solutions',
    desc: 'Every question comes with detailed video explanations by expert faculty, helping you learn from your mistakes.',
    icon: '🎬',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
  },
  {
    title: 'Progress Tracking',
    desc: 'Set daily goals, earn XP, and track your consistency with streak counters and achievement badges.',
    icon: '🎯',
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50',
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative z-10 py-28" id="features">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accentPrimary/[0.02] to-transparent -z-10"></div>
      
      <div className="w-full max-w-[1200px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accentPrimary/5 border border-accentPrimary/10 rounded-full text-[0.8rem] font-bold text-accentPrimary mb-6 uppercase tracking-widest">
            ✦ Why Choose Parishram
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-5 tracking-tight">
            Everything you need to
            <br />
            <span className="gradient-text">crack your dream exam</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            From mock tests to analytics, we provide the complete toolkit that was previously only available at expensive coaching centers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, idx) => (
            <div 
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-gray-200" 
              key={idx}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accentPrimary transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-500 text-[0.95rem] leading-relaxed">{feature.desc}</p>

              {/* Learn more link */}
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-accentPrimary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-accentPrimary via-indigo-600 to-purple-600 p-12 md:p-16">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-extrabold text-white mb-3">Ready to start your journey?</h3>
              <p className="text-white/70 text-lg max-w-lg">Join 2,500+ students who are already preparing smarter with Parishram. Start with a free account today.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="/login" className="px-8 py-4 bg-white text-accentPrimary font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 whitespace-nowrap">
                Get Started Free
              </a>
              <a href="#courses" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all whitespace-nowrap">
                View Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
