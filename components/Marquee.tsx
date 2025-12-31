
import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="bg-red-600 overflow-hidden whitespace-nowrap py-3 relative border-y border-red-700">
      <div className="inline-block animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xs font-black tracking-tighter mx-4 italic">
            FOLLOW US @THEARTDANCE &nbsp; //
          </span>
        ))}
      </div>
      <div className="inline-block animate-marquee absolute top-3">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xs font-black tracking-tighter mx-4 italic">
            FOLLOW US @THEARTDANCE &nbsp; //
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
