
import React, { useState } from 'react';
import { X, Play } from 'lucide-react';
import { KPOP_VIDEOS } from '../constants.ts';
import { Video } from '../types.ts';

const VideoGallery: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <section id="videos" className="bg-black min-h-screen py-12 px-6 md:px-12 lg:px-24">
      {/* Optional: Add a subtle title at the top if needed, but screenshot focus is the grid */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-[900] tracking-tighter uppercase mb-2 text-white">
          K-POP MUSIC VIDEO
        </h1>
        <div className="w-16 h-1 bg-red-600 mb-6"></div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {KPOP_VIDEOS.map((video) => (
          <div 
            key={video.id} 
            className="group relative w-full aspect-[21/9] md:aspect-[21/8] bg-neutral-900 overflow-hidden cursor-pointer rounded-sm"
            onClick={() => setActiveVideo(video)}
          >
            {/* Main Image */}
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-in-out"
            />
            
            {/* Dark Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            
            {/* Overlay Content matching screenshot */}
            <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
              {/* Category with Red Line */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-black tracking-[0.2em] text-red-600 uppercase">
                  {video.category}
                </span>
                <div className="h-[1px] w-16 bg-red-600 opacity-80"></div>
              </div>
              
              {/* Main Title (Large & Bold) */}
              <h3 className="text-4xl md:text-7xl font-[900] tracking-tight text-white uppercase leading-none mb-4 group-hover:translate-x-1 transition-transform">
                {video.title}
              </h3>
              
              {/* Artist and Play Button Pill */}
              <div className="flex items-center gap-6">
                <p className="text-xl md:text-2xl font-black text-white/50 italic uppercase tracking-tight">
                  {video.artist}
                </p>
                
                <div className="flex items-center gap-2 px-5 py-2 border border-white/40 rounded-full text-[10px] font-black tracking-widest text-white hover:bg-white hover:text-black transition-all">
                  <Play size={10} fill="currentColor" /> PLAY VIDEO
                </div>
              </div>
            </div>

            {/* Subtle Screen Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen bg-neutral-500/10"></div>
          </div>
        ))}
      </div>

      {/* Full Screen YouTube Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-2xl" 
            onClick={() => setActiveVideo(null)}
          ></div>
          
          <div className="relative z-10 w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            {/* Modal Navigation */}
            <div className="flex justify-between items-center p-8 bg-black">
               <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase">{activeVideo.category}</span>
                    <div className="h-[1px] w-10 bg-red-600/50"></div>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-white mt-1 uppercase">{activeVideo.title} — {activeVideo.artist}</h2>
               </div>
               <button 
                className="text-white/40 hover:text-white transition-all hover:scale-110"
                onClick={() => setActiveVideo(null)}
              >
                <X size={44} strokeWidth={1} />
              </button>
            </div>
            
            {/* Immersive Player Area */}
            <div className="flex-grow w-full bg-black relative shadow-inner">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&autohide=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
