import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 pt-20 pb-8 mt-0" id="about">
      <div className="w-full max-w-[1200px] mx-auto px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accentPrimary to-indigo-500 flex items-center justify-center text-[1.2rem] font-black text-white shadow-lg shadow-accentPrimary/30">
                P
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">Parishram</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering low-income students with affordable mock tests, deep analytics, and quality content. Education is a right, not a privilege.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { label: 'Twitter', icon: '𝕏' },
                { label: 'LinkedIn', icon: 'in' },
                { label: 'GitHub', icon: 'GH' },
                { label: 'YouTube', icon: 'YT' },
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700/50 flex items-center justify-center text-gray-400 text-sm font-bold hover:bg-accentPrimary hover:text-white hover:border-accentPrimary/50 transition-all duration-300 hover:-translate-y-0.5" 
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-gray-300 uppercase tracking-[0.15em] mb-6">Platform</h4>
            <ul className="flex flex-col gap-3">
              {['Mock Tests', 'Analytics', 'Courses', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 text-sm transition-all duration-200 hover:text-white inline-flex items-center gap-2 group">
                    <span className="w-0 h-px bg-accentPrimary group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-gray-300 uppercase tracking-[0.15em] mb-6">Resources</h4>
            <ul className="flex flex-col gap-3">
              {['Help Center', 'Study Material', 'Blog', 'Community'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 text-sm transition-all duration-200 hover:text-white inline-flex items-center gap-2 group">
                    <span className="w-0 h-px bg-accentPrimary group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-gray-300 uppercase tracking-[0.15em] mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Our Mission', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 text-sm transition-all duration-200 hover:text-white inline-flex items-center gap-2 group">
                    <span className="w-0 h-px bg-accentPrimary group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Parishram Academy. Built with ❤️ for India's future.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
