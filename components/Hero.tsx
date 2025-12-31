
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Texture Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/50">PREMIUM DANCE STUDIO</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter max-w-4xl uppercase">
          We don't need <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-60">a stage to</span> <br />
          dance
        </h1>

        <a href="#videos" className="mt-12 flex flex-col items-center group">
          <span className="text-[10px] font-bold tracking-widest mb-4 group-hover:text-red-500 transition-colors">LEARN MORE</span>
          <div className="w-[1px] h-12 bg-white/20 group-hover:bg-red-500 transition-colors"></div>
        </a>
      </div>
      
      {/* Background large logo element */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">
        THEART
      </div>
    </section>
  );
};

export default Hero;
