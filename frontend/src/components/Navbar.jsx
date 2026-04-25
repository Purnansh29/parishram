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
    { label: 'Features', to: '/' },
    { label: 'About', to: '/' },
    { label: 'Contact', to: '/' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] py-4 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'}`}
        id="navbar"
      >
        <div className="w-full max-w-[1200px] mx-auto px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer transition-transform duration-200" id="navbar-logo">
            <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center text-[1.4rem] font-extrabold text-white shadow-md">
              P
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-gray-900">Parishram</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative text-[0.95rem] font-medium text-gray-700 py-2 transition-colors duration-200 hover:text-accentPrimary group"
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="px-6 py-2.5 rounded-md bg-accentPrimary text-white text-[0.95rem] font-semibold tracking-wide transition-colors duration-200 shadow-sm hover:bg-accentPrimary/90 cursor-pointer" id="navbar-cta">
              Login/Register
            </Link>
          </div>

          <button
            className="flex md:hidden flex-col gap-[5px] bg-transparent p-1 cursor-pointer group"
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

      <div className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 z-[999] transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} id="navbar-mobile-menu">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="text-[1.2rem] font-medium text-gray-800 transition-colors duration-200 hover:text-accentPrimary"
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/login" className="px-8 py-3 rounded-md bg-accentPrimary text-white text-[1rem] font-semibold cursor-pointer mt-4" onClick={closeMobile}>
          Login/Register
        </Link>
      </div>
    </>
  );
};

export default Navbar;
