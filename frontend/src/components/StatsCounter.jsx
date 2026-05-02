import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 5000, suffix: '+', label: 'Active Students', icon: '🎓' },
  { value: 50, suffix: '+', label: 'Expert Courses', icon: '📚' },
  { value: 95, suffix: '%', label: 'Success Rate', icon: '🏆' },
  { value: 499, prefix: '₹', label: 'Starting Price', icon: '💎' },
];

const StatsCounter = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounts(prev => {
                const next = [...prev];
                next[index] = Math.round(current);
                return next;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accentPrimary via-indigo-600 to-purple-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.15)_0%,transparent_50%)]"></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-2xl mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
                {stat.prefix || ''}{counts[idx].toLocaleString()}{stat.suffix || ''}
              </div>
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
