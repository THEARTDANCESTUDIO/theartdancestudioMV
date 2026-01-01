
import React, { useState } from 'react';
import VideoGallery from './components/VideoGallery.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { KPOP_VIDEOS } from './constants.ts';
import { Video, Language } from './types.ts';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(KPOP_VIDEOS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState<Language>('KO');

  const handleAddVideo = (newVideo: Video) => {
    setVideos([newVideo, ...videos]);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const handleMoveVideo = (id: string, direction: 'up' | 'down') => {
    const index = videos.findIndex(v => v.id === id);
    if (index === -1) return;
    
    const newVideos = [...videos];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newVideos.length) {
      [newVideos[index], newVideos[targetIndex]] = [newVideos[targetIndex], newVideos[index]];
      setVideos(newVideos);
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-red-600 selection:text-white pt-16">
      <Navbar currentLang={lang} onLangChange={setLang} />
      <main>
        <VideoGallery videos={videos} lang={lang} />
      </main>
      <Footer onTriggerAdmin={() => setIsAdmin(!isAdmin)} lang={lang} />
      
      {isAdmin && (
        <AdminPanel 
          videos={videos} 
          onAdd={handleAddVideo} 
          onDelete={handleDeleteVideo}
          onMove={handleMoveVideo}
          onClose={() => setIsAdmin(false)} 
          lang={lang}
        />
      )}
    </div>
  );
};

export default App;
