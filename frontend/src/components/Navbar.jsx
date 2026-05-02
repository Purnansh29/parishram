import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { label: 'Features', to: '#features' },
    { label: 'Courses', to: '#courses' },
    { label: 'Pricing', to: '#pricing' },
    { label: 'About', to: '#about' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled 
            ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)]' 
            : 'py-5 bg-transparent'
        }`}
        id="navbar"
      >
        <div className="w-full max-w-[1200px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer group" id="navbar-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accentPrimary to-indigo-600 flex items-center justify-center text-[1.2rem] font-black text-white shadow-lg shadow-accentPrimary/25 group-hover:shadow-xl group-hover:shadow-accentPrimary/30 transition-all">
              P
            </div>
            <span className="font-heading font-extrabold text-[1.4rem] tracking-tight text-gray-900">
              Parishram
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                className="relative px-5 py-2.5 text-[0.9rem] font-semibold text-gray-500 rounded-xl transition-all duration-200 hover:text-gray-900 hover:bg-gray-50"
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-5 py-2.5 text-[0.9rem] font-semibold text-gray-600 rounded-xl hover:text-gray-900 hover:bg-gray-50 transition-all">
              Log in
            </Link>
            <Link to="/login" className="px-6 py-2.5 rounded-xl bg-accentPrimary text-white text-[0.9rem] font-bold transition-all shadow-md shadow-accentPrimary/20 hover:shadow-lg hover:shadow-accentPrimary/30 hover:-translate-y-0.5" id="navbar-cta">
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex md:hidden flex-col gap-[5px] bg-transparent p-2 cursor-pointer group"
            onClick={toggleMobile}
            id="navbar-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 z-[999] transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} id="navbar-mobile-menu">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.to}
            className="text-[1.3rem] font-semibold text-gray-800 transition-colors duration-200 hover:text-accentPrimary"
            onClick={closeMobile}
          >
            {link.label}
          </a>
        ))}
        <Link to="/login" className="px-10 py-3.5 rounded-xl bg-accentPrimary text-white text-[1rem] font-bold shadow-lg shadow-accentPrimary/20 mt-4" onClick={closeMobile}>
          Get Started
        </Link>
      </div>
    </>
  );
};

export default Navbar;
