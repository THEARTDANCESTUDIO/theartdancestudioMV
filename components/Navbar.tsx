
import React from 'react';
import { NAV_LINKS } from '../constants';
import { Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 h-16 flex items-center px-6 md:px-12 justify-between">
      <div className="flex items-center gap-8">
        <a href="/" className="text-xl font-black tracking-tighter flex items-center">
          THEART<span className="text-red-600 block w-1.5 h-1.5 ml-0.5 mt-1 rounded-full"></span>
        </a>
        
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-[10px] font-bold tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-[10px] font-bold tracking-widest flex items-center gap-1">
          <Globe size={12} /> EN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
