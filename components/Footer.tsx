
import React from 'react';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-white/40 block mb-2">FAQ</span>
            <h3 className="text-3xl font-black tracking-tighter mb-4">ANY QUESTIONS?</h3>
            <p className="text-white/50 text-sm">Check our frequently asked questions for quick answers about our programs.</p>
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-white/40 block mb-2">CONTACT US</span>
            <h3 className="text-3xl font-black tracking-tighter mb-4">GET IN TOUCH</h3>
            <p className="text-white/50 text-sm">Our team is here to help you start your journey with THEART.</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            THEART<span className="text-red-600">.</span>
          </div>
          
          <div className="space-y-2 mb-12">
            <p className="text-xs font-bold tracking-widest text-white/60">DANCE STUDIO HEAD OFFICE</p>
            <p className="text-sm font-medium">+82 10 9584 9901</p>
            <p className="text-sm font-medium hover:text-red-500 cursor-pointer">INFO@THEARTDANCE.COM</p>
          </div>

          <div className="flex items-center gap-6 mb-12">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Youtube size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8 gap-4">
            <p className="text-[10px] text-white/20">© 2024 THEART DANCE STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4">
              <a href="#" className="text-[10px] text-white/20 hover:text-white/40">TERMS</a>
              <a href="#" className="text-[10px] text-white/20 hover:text-white/40">PRIVACY</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
