
import React, { useState, useEffect } from 'react';
import VideoGallery from './components/VideoGallery.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { KPOP_VIDEOS } from './constants.ts';
import { Video, Language } from './types.ts';

const App: React.FC = () => {
  // Load initial videos from localStorage or fallback to constants
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('theart_videos');
    return saved ? JSON.parse(saved) : KPOP_VIDEOS;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState<Language>('KO');

  // Sync videos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('theart_videos', JSON.stringify(videos));
  }, [videos]);

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

  const handleResetVideos = () => {
    if (window.confirm('모든 데이터를 초기 상태로 복구하시겠습니까?')) {
      setVideos(KPOP_VIDEOS);
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
          onReset={handleResetVideos}
          onClose={() => setIsAdmin(false)} 
          lang={lang}
        />
      )}
    </div>
  );
};

export default App;
