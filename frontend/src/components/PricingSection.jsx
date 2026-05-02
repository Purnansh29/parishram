import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    desc: 'Perfect for exploring the platform',
    badge: null,
    features: [
      { text: 'Access to 2 free courses', included: true },
      { text: '5 mock tests per month', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Video solutions', included: false },
      { text: 'National ranking', included: false },
      { text: 'Doubt solving support', included: false },
      { text: 'Downloadable notes', included: false },
    ],
    cta: 'Get Started Free',
    style: 'bg-white border border-gray-200',
    ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
  {
    name: 'Pro',
    price: '₹499',
    period: '/batch',
    desc: 'Most popular choice for serious aspirants',
    badge: 'Most Popular',
    features: [
      { text: 'All courses in your batch', included: true },
      { text: 'Unlimited mock tests', included: true },
      { text: 'Advanced analytics + AI insights', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Video solutions for every question', included: true },
      { text: 'National ranking + percentile', included: true },
      { text: 'Doubt solving via chat', included: true },
      { text: 'Downloadable notes', included: false },
    ],
    cta: 'Start Pro Plan',
    style: 'bg-gradient-to-br from-accentPrimary to-indigo-700 text-white border-0 shadow-2xl shadow-accentPrimary/25 scale-[1.04]',
    ctaStyle: 'bg-white text-accentPrimary hover:bg-gray-50 shadow-lg',
  },
  {
    name: 'Premium',
    price: '₹999',
    period: '/batch',
    desc: 'Complete access to everything we offer',
    badge: null,
    features: [
      { text: 'All courses (every batch)', included: true },
      { text: 'Unlimited mock tests', included: true },
      { text: 'Advanced analytics + AI insights', included: true },
      { text: 'Priority community access', included: true },
      { text: 'Video solutions for every question', included: true },
      { text: 'National ranking + percentile', included: true },
      { text: '1-on-1 doubt solving sessions', included: true },
      { text: 'Downloadable notes + PYQs', included: true },
    ],
    cta: 'Go Premium',
    style: 'bg-white border border-gray-200',
    ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
];

const PricingSection = () => {
  return (
    <section className="py-28 bg-gray-50/50 relative overflow-hidden" id="pricing">
      <div className="w-full max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="text-center max-w-[650px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accentPrimary/5 border border-accentPrimary/10 rounded-full text-[0.8rem] font-bold text-accentPrimary mb-6 uppercase tracking-widest">
            ✦ Simple Pricing
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-5 tracking-tight">
            Invest in your future,
            <br />
            <span className="gradient-text">not your savings</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Quality education shouldn't cost a fortune. Choose a plan that fits your pocket.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-500 hover:-translate-y-2 ${plan.style}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
                  {plan.badge}
                </div>
              )}

              <h3 className={`text-lg font-black uppercase tracking-widest mb-2 ${idx === 1 ? 'text-white/80' : 'text-gray-400'}`}>
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-5xl font-black ${idx === 1 ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                {plan.period && <span className={`text-sm font-bold ${idx === 1 ? 'text-white/60' : 'text-gray-400'}`}>{plan.period}</span>}
              </div>

              <p className={`text-sm mb-8 ${idx === 1 ? 'text-white/60' : 'text-gray-400'}`}>{plan.desc}</p>

              {/* Features */}
              <ul className="flex-1 flex flex-col gap-3 mb-10">
                {plan.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm ${f.included ? (idx === 1 ? 'text-white/90' : 'text-gray-700') : (idx === 1 ? 'text-white/30' : 'text-gray-300')}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${f.included ? (idx === 1 ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600') : (idx === 1 ? 'bg-white/5 text-white/20' : 'bg-gray-50 text-gray-300')}`}>
                      {f.included ? '✓' : '—'}
                    </span>
                    <span className={!f.included ? 'line-through' : ''}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className={`block text-center px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-0.5 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
