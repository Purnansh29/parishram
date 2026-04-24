import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bgSecondary border-t border-borderColor pt-24 pb-4 mt-24">
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-24">
          <div className="max-w-[300px]">
            <Link to="/" className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tight mb-4">
              <div className="w-8 h-8 rounded-md bg-accent-gradient flex items-center justify-center text-base font-extrabold text-white">P</div>
              <span>Parishram</span>
            </Link>
            <p className="text-textSecondary text-[0.95rem] leading-relaxed">
              The modern, all-in-one platform for managing your school's daily operations. Built for educators, loved by parents.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[1.1rem] text-textPrimary mb-6 font-heading">Platform</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Features</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Pricing</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Integrations</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Case Studies</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[1.1rem] text-textPrimary mb-6 font-heading">Resources</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Help Center</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">API Documentation</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Blog</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Community</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[1.1rem] text-textPrimary mb-6 font-heading">Company</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">About Us</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Careers</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Contact</Link></li>
              <li><Link to="/" className="text-textSecondary text-[0.95rem] transition-all duration-200 hover:text-accentSecondary inline-block hover:translate-x-1">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-borderColor pt-6 flex flex-col md:flex-row items-center justify-between text-center gap-4">
          <p className="text-textMuted text-[0.85rem]">
            &copy; {new Date().getFullYear()} Parishram. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="text-textMuted transition-colors duration-200 hover:text-textPrimary" aria-label="Twitter">𝕏</Link>
            <Link to="/" className="text-textMuted transition-colors duration-200 hover:text-textPrimary" aria-label="LinkedIn">in</Link>
            <Link to="/" className="text-textMuted transition-colors duration-200 hover:text-textPrimary" aria-label="GitHub">GH</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
