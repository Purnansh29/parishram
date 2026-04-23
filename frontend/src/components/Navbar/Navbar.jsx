import { useState, useEffect } from 'react';

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
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] py-4 transition-all duration-300 ${scrolled ? 'bg-[#0a0a12]/85 backdrop-blur-[20px] border-b border-borderColor shadow-md' : 'bg-transparent'}`}
        id="navbar"
      >
        <div className="w-full max-w-[1200px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tight cursor-pointer transition-transform duration-200 hover:scale-[1.03]" id="navbar-logo">
            <div className="w-9 h-9 rounded-md bg-accent-gradient flex items-center justify-center text-[1.1rem] font-extrabold text-white shadow-[0_0_20px_rgba(108,92,231,0.35)]">P</div>
            <span className="gradient-text">Parishram</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[0.9rem] font-medium text-textSecondary py-1 transition-colors duration-200 hover:text-textPrimary group"
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-accent-gradient rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="px-6 py-2.5 rounded-full border-none bg-accent-gradient text-white text-[0.85rem] font-semibold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(108,92,231,0.25)] hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(108,92,231,0.45)] cursor-pointer" id="navbar-cta">
              Get Started
            </button>
          </div>

          <button
            className="flex md:hidden flex-col gap-[5px] bg-transparent p-1 cursor-pointer group"
            onClick={toggleMobile}
            id="navbar-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-6 h-[2px] bg-textPrimary rounded-full transition-all duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-textPrimary rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-textPrimary rounded-full transition-all duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-[#0a0a12]/95 backdrop-blur-[30px] flex flex-col items-center justify-center gap-8 z-[999] transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} id="navbar-mobile-menu">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[1.3rem] font-medium text-textSecondary transition-colors duration-200 hover:text-textPrimary"
            onClick={closeMobile}
          >
            {link.label}
          </a>
        ))}
        <button className="px-9 py-3.5 rounded-full border-none bg-accent-gradient text-white text-[1rem] font-semibold cursor-pointer" onClick={closeMobile}>
          Get Started
        </button>
      </div>
    </>
  );
};

export default Navbar;
