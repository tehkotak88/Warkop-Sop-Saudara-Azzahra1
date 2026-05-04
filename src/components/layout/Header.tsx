import { useEffect, useState } from 'react';

import { HOME_NAV_LINKS } from '../../config/navigation';
import { SectionId } from '../../types/app';

interface HeaderProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-2.5 text-white transition-all duration-700 md:px-8 ${
            isScrolled
              ? 'border border-white/10 bg-red-950/90 shadow-2xl shadow-red-950/50 backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          {/* Brand */}
          <button onClick={() => onNavigate('hero')} className="group flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-yellow-400/50 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              <img src="/favicon.jpg" alt="Logo Warkop Azzahra" className="h-full w-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className={`font-serif text-sm font-bold transition-all ${isScrolled ? 'text-white' : 'text-white/90'}`}>
                Warkop <span className="text-yellow-400 italic">Azzahra</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {HOME_NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="relative rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 md:hidden"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="mt-3 overflow-hidden rounded-2xl border border-red-900 bg-red-950/95 backdrop-blur-xl"
            style={{ animation: 'slideDown 0.3s ease' }}
          >
            <nav className="p-3">
              {HOME_NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-xl px-5 py-3.5 text-left text-sm font-bold text-white/80 transition-all hover:bg-red-900/50 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Header;
