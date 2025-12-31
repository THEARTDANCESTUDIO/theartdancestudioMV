
import React, { useState } from 'react';
import { X, Play } from 'lucide-react';
import { KPOP_VIDEOS } from '../constants';
import { Video } from '../types';

const VideoGallery: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <section id="videos" className="bg-black min-h-screen py-20 px-6 md:px-12 lg:px-32">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-[900] tracking-tighter uppercase mb-4">
          K-POP MUSIC VIDEO
        </h1>
        <div className="w-20 h-2 bg-red-600 mb-10"></div>
        <p className="text-white/40 max-w-2xl text-base md:text-lg leading-relaxed font-medium">
          Explore the latest and hottest K-POP music videos choreographed and performed by THEART artists. 
          Experience the energy, style, and precision that defines our studio in a large-scale format.
        </p>
      </div>

      {/* Single Column Layout for Large Previews */}
      <div className="grid grid-cols-1 gap-12 md:gap-20">
        {KPOP_VIDEOS.map((video) => (
          <div 
            key={video.id} 
            className="group relative w-full aspect-[21/9] md:aspect-[21/7] bg-neutral-900 overflow-hidden cursor-pointer rounded-sm"
            onClick={() => setActiveVideo(video)}
          >
            {/* High Quality Thumbnail */}
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
            />
            
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-red-950/40 transition-colors duration-500"></div>
            
            {/* Large Text Content */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs md:text-sm font-black tracking-[0.3em] text-red-600 uppercase">
                  {video.category}
                </span>
                <div className="h-[1px] w-12 bg-red-600/50"></div>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none mb-2 group-hover:translate-x-2 transition-transform duration-500">
                {video.title}
              </h3>
              
              <div className="flex items-center gap-4">
                <p className="text-lg md:text-xl font-bold text-white/50 italic">
                  {video.artist}
                </p>
                
                {/* Visual Play Indicator */}
                <div className="flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <Play size={12} fill="white" /> PLAY VIDEO
                </div>
              </div>
            </div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }}></div>
          </div>
        ))}
      </div>

      {/* Immersive Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-2xl" 
            onClick={() => setActiveVideo(null)}
          ></div>
          
          <div className="relative z-10 w-full h-full flex flex-col animate-in fade-in duration-500">
            {/* Modal Controls */}
            <div className="flex justify-between items-center p-6 md:px-12">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase mb-1">{activeVideo.category}</span>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">{activeVideo.title} — {activeVideo.artist}</h2>
               </div>
               <button 
                className="text-white/50 hover:text-white transition-all hover:rotate-90 duration-300"
                onClick={() => setActiveVideo(null)}
              >
                <X size={40} strokeWidth={1} />
              </button>
            </div>
            
            {/* Giant YouTube Integration */}
            <div className="flex-grow w-full bg-black relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&hd=1`}
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
