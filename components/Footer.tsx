
import React, { useRef } from 'react';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  onTriggerAdmin: () => void;
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ onTriggerAdmin, lang }) => {
  const t = TRANSLATIONS[lang].footer;
  
  // Secret trigger state
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  const handlePrivacyClick = (e: React.MouseEvent) => {
    // Prevent default anchor behavior if we want it to stay secret
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastClickTime.current < 1000) {
      clickCount.current += 1;
    } else {
      clickCount.current = 1;
    }
    lastClickTime.current = now;

    if (clickCount.current >= 5) {
      onTriggerAdmin();
      clickCount.current = 0; // Reset after trigger
    }
  };

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <a 
            href="https://stupendous-shortbread-e6c2e2.netlify.app" 
            className="group block"
          >
            <span className="text-[10px] font-bold tracking-widest text-white/40 block mb-2 group-hover:text-red-500 transition-colors uppercase">{t.faq}</span>
            <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-white transition-colors">{t.anyQuestions}</h3>
            <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">{t.faqDesc}</p>
          </a>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-white/40 block mb-2 uppercase">{t.contact}</span>
            <h3 className="text-3xl font-black tracking-tighter mb-4">{t.getInTouch}</h3>
            <p className="text-white/50 text-sm">{t.contactDesc}</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            THEART<span className="text-red-600">.</span>
          </div>
          
          <div className="space-y-2 mb-12">
            <p className="text-xs font-bold tracking-widest text-white/60 uppercase">{t.office}</p>
            <p className="text-sm font-medium">+82 10 9584 9901</p>
            <p className="text-sm font-medium hover:text-red-500 cursor-pointer">INFO@THEARTDANCE.COM</p>
          </div>

          <div className="flex items-center gap-6 mb-12">
            <a 
              href="https://www.instagram.com/theart_dance_studio/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.youtube.com/@THEART_DANCE_STUDIO" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8 gap-4">
            <p className="text-[10px] text-white/20">© 2024 THEART DANCE STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 items-center">
              <a href="#" className="text-[10px] text-white/20 hover:text-white/40 uppercase">{t.terms}</a>
              <button 
                onClick={handlePrivacyClick}
                className="text-[10px] text-white/20 hover:text-white/40 uppercase cursor-default"
              >
                {t.privacy}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
