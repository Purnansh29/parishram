import { useState } from 'react';

const faqs = [
  {
    question: 'What makes Parishram different from other platforms?',
    answer: 'Parishram is built specifically for low-income students. We offer premium-quality mock tests, video lectures, and analytics at just ₹499 — that\'s 90% cheaper than other coaching platforms. Our mission is education for all.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! Our Starter plan is completely free forever. You get access to 2 free courses, 5 mock tests per month, and basic analytics. No credit card required to sign up.',
  },
  {
    question: 'What exams does Parishram cover?',
    answer: 'We currently offer preparation material for JEE Main, JEE Advanced, NEET, UPSC Foundation, and Board exams (CBSE/State). We\'re constantly adding new courses.',
  },
  {
    question: 'How are the mock tests structured?',
    answer: 'Our mock tests follow the exact NTA pattern with proper marking scheme (+4 for correct, -1 for wrong). You get subject-wise analysis, national ranking, and detailed solutions after each test.',
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'Absolutely. We offer a 7-day money-back guarantee. If you\'re not satisfied with the content quality, just reach out to our support team for a full refund.',
  },
  {
    question: 'Do I need to install any app?',
    answer: 'No! Parishram is a web-based platform that works perfectly on any browser — mobile, tablet, or desktop. Just open the website and start learning.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-white" id="faq">
      <div className="w-full max-w-[800px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accentPrimary/5 border border-accentPrimary/10 rounded-full text-[0.8rem] font-bold text-accentPrimary mb-6 uppercase tracking-widest">
            ✦ Got Questions?
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-5 tracking-tight">
            Frequently asked
            <br />
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto">
            Everything you need to know about Parishram. Can't find your answer? Reach out to us.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'border-accentPrimary/20 bg-accentPrimary/[0.02] shadow-lg shadow-accentPrimary/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left gap-4"
                >
                  <span className={`text-[0.95rem] font-bold transition-colors ${isOpen ? 'text-accentPrimary' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-accentPrimary text-white rotate-45' : 'bg-gray-100 text-gray-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-7 pb-6 text-gray-500 text-[0.9rem] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-3">Still have questions?</p>
          <a href="mailto:support@parishram.edu" className="inline-flex items-center gap-2 text-accentPrimary font-bold text-sm hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
