
import React, { useState } from 'react';
import { X, Play } from 'lucide-react';
import { Video, Language } from '../types.ts';
import { TRANSLATIONS } from '../constants.ts';

interface VideoGalleryProps {
  videos: Video[];
  lang: Language;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, lang }) => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const t = TRANSLATIONS[lang].gallery;

  return (
    <section id="videos" className="bg-black min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="mb-14">
        <h1 className="text-4xl md:text-6xl font-[900] tracking-tighter uppercase mb-2 text-white">
          {t.title}
        </h1>
        <div className="w-16 h-1.5 bg-red-600 mb-6"></div>
      </div>

      <div className="grid grid-cols-1 gap-14">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="group relative w-full aspect-[21/9] bg-black overflow-hidden cursor-pointer rounded-sm border border-white/5 hover:border-white/10 transition-colors duration-500"
            onClick={() => setActiveVideo(video)}
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
            
            <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end items-start">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] font-black tracking-[0.3em] text-red-600 uppercase">
                  {video.category}
                </span>
                <div className="h-[1px] w-20 bg-red-600/60"></div>
              </div>
              
              <h3 className="text-5xl md:text-8xl font-[900] tracking-tighter text-white uppercase leading-none mb-6 group-hover:tracking-tight transition-all duration-700">
                {video.title}
              </h3>
              
              <div className="flex items-center gap-6">
                <p className="text-xl md:text-3xl font-black text-white/40 italic uppercase tracking-tighter group-hover:text-white/70 transition-colors">
                  {video.artist}
                </p>
                
                <div className="flex items-center gap-2 px-6 py-2.5 border border-white/20 rounded-full text-[11px] font-black tracking-widest text-white/60 group-hover:text-white group-hover:border-white/50 hover:bg-white hover:text-black transition-all duration-300">
                  <Play size={12} fill="currentColor" /> {t.play}
                </div>
              </div>
            </div>

            {/* Grain/Texture Overlay for deeper black feel */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-3xl" 
            onClick={() => setActiveVideo(null)}
          ></div>
          
          <div className="relative z-10 w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
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
