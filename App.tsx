
import React, { useState, useEffect, useCallback } from 'react';
import VideoGallery from './components/VideoGallery.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { KPOP_VIDEOS } from './constants.ts';
import { Video, Language } from './types.ts';

const App: React.FC = () => {
  // Load initial videos: Prioritize LocalStorage during development, fallback to constants.ts
  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem('theart_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return KPOP_VIDEOS;
    } catch (e) {
      console.error('Failed to load videos', e);
      return KPOP_VIDEOS;
    }
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState<Language>('KO');

  // Persistence to local browser storage
  useEffect(() => {
    localStorage.setItem('theart_videos', JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = useCallback((newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
  }, []);

  const handleDeleteVideo = useCallback((id: string) => {
    setVideos(prev => {
      // Robust filtering using string comparison to avoid type mismatch
      const updated = prev.filter(v => String(v.id).trim() !== String(id).trim());
      console.log(`[Admin] Deleting ID: ${id}. Remaining: ${updated.length}`);
      return [...updated];
    });
  }, []);

  const handleMoveVideo = useCallback((id: string, direction: 'up' | 'down') => {
    setVideos(prev => {
      const index = prev.findIndex(v => String(v.id) === String(id));
      if (index === -1) return prev;
      
      const newVideos = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (targetIndex >= 0 && targetIndex < newVideos.length) {
        [newVideos[index], newVideos[targetIndex]] = [newVideos[targetIndex], newVideos[index]];
        return newVideos;
      }
      return prev;
    });
  }, []);

  const handleResetVideos = useCallback(() => {
    if (window.confirm('모든 데이터를 constants.ts의 기본값으로 초기화하시겠습니까?')) {
      setVideos([...KPOP_VIDEOS]);
      localStorage.removeItem('theart_videos');
    }
  }, []);

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
