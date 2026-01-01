
import React from 'react';
import { NAV_LINKS, TRANSLATIONS } from '../constants';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onLangChange }) => {
  const languages: Language[] = ['EN', 'KO', 'JA', 'ZH'];
  
  const handleToggleLang = () => {
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    onLangChange(languages[nextIndex]);
  };

  const t = TRANSLATIONS[currentLang].nav;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 h-16 flex items-center px-6 md:px-12 justify-between">
      <div className="flex items-center gap-8">
        <a href="https://theartdancestudio1120.netlify.app" className="text-xl font-black tracking-tighter flex items-center">
          THEART<span className="text-red-600 block w-1.5 h-1.5 ml-0.5 mt-1 rounded-full"></span>
        </a>
        
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.labelKey} 
              href={link.href} 
              className="text-[10px] font-bold tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {t[link.labelKey]}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleToggleLang}
          className="text-[10px] font-bold tracking-widest flex items-center gap-1.5 hover:text-red-500 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
        >
          <Globe size={12} className="text-red-600" /> {currentLang}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
