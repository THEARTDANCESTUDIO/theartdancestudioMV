
import React, { useState, useEffect, useCallback } from 'react';
import VideoGallery from './components/VideoGallery.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { KPOP_VIDEOS } from './constants.ts';
import { Video, Language } from './types.ts';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem('theart_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : KPOP_VIDEOS;
      }
      return KPOP_VIDEOS;
    } catch (e) {
      console.error('Failed to load videos', e);
      return KPOP_VIDEOS;
    }
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState<Language>('KO');

  // Strict persistence
  useEffect(() => {
    localStorage.setItem('theart_videos', JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = useCallback((newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
  }, []);

  const handleDeleteVideo = useCallback((id: string) => {
    setVideos(prev => {
      // Create a completely new reference and filter strictly
      const updated = prev.filter(v => String(v.id).trim() !== String(id).trim());
      // Log for debugging in browser console
      console.log(`Deleting video with ID: ${id}. Remaining count: ${updated.length}`);
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
    if (window.confirm('모든 데이터를 초기 상태로 복구하시겠습니까? (로컬 저장소 초기화)')) {
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
