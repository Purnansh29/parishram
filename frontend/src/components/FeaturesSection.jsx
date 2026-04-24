const featuresData = [
  {
    title: 'Student Management',
    desc: 'Easily track student enrollment, attendance, grades, and behavior profiles in one unified dashboard.',
    icon: '🎓'
  },
  {
    title: 'Teacher Portal',
    desc: 'Empower educators with powerful tools for lesson planning, grading, and direct communication with parents.',
    icon: '👨‍🏫'
  },
  {
    title: 'Finance & Fees',
    desc: 'Automate fee collection, generate invoices, and get real-time financial reporting for your institution.',
    icon: '💳'
  },
  {
    title: 'Communication Hub',
    desc: 'Seamless SMS and Email integration ensuring parents and staff are always updated instantly.',
    icon: '💬'
  },
  {
    title: 'Exams & Results',
    desc: 'Configure grading systems, auto-generate report cards, and analyze student performance trends.',
    icon: '📊'
  },
  {
    title: 'Library & Inventory',
    desc: 'Keep track of library books, lab equipment, and school assets with our powerful inventory module.',
    icon: '📚'
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative z-10 bg-bgPrimary py-24" id="features">
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="text-center max-w-[600px] mx-auto mb-24">
          <p className="text-accentSecondary font-semibold uppercase tracking-[2px] text-[0.85rem] mb-2">Core Capabilities</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold">Everything you need to run your school</h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {featuresData.map((feature, idx) => (
            <div className="bg-bgCard border border-borderColor rounded-[24px] p-8 md:p-10 transition-all duration-300 relative overflow-hidden z-[1] group hover:-translate-y-[5px] hover:border-borderHover hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]" key={idx}>
              {/* Hover gradient background effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(108,92,231,0.1),transparent_70%)] opacity-0 transition-opacity duration-300 -z-10 group-hover:opacity-100"></div>

              <div className="w-[60px] h-[60px] rounded-2xl bg-bgGlass flex items-center justify-center text-2xl mb-8 border border-borderColor text-accentSecondary transition-all duration-300 group-hover:bg-accent-gradient group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(108,92,231,0.4)]">
                {feature.icon}
              </div>
              <h3 className="text-xl mb-2">{feature.title}</h3>
              <p className="text-textSecondary text-[0.95rem] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
