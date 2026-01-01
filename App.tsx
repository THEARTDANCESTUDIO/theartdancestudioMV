import React, { useState, useEffect, useCallback } from 'react';
import VideoGallery from './components/VideoGallery.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { KPOP_VIDEOS } from './constants.ts';
import { Video, Language } from './types.ts';

const App: React.FC = () => {
  // 로컬 스토리지를 확인하여 이전에 작업하던 데이터가 있으면 불러오고, 없으면 코드의 기본값을 사용합니다.
  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem('theart_videos_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [...KPOP_VIDEOS];
    } catch (e) {
      console.error('Failed to load videos from storage', e);
      return [...KPOP_VIDEOS];
    }
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState<Language>('KO');

  // 작업 중인 영상 리스트를 브라우저에 임시 저장합니다 (새로고침 시 유지용)
  useEffect(() => {
    localStorage.setItem('theart_videos_v2', JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = useCallback((newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
  }, []);

  const handleDeleteVideo = useCallback((id: string) => {
    setVideos(prev => {
      // ID를 정확히 비교하기 위해 string 변환 후 공백 제거
      const updated = prev.filter(v => String(v.id).trim() !== String(id).trim());
      console.log(`[Admin] Deleting Video ID: ${id}. Remaining: ${updated.length}`);
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
        return [...newVideos];
      }
      return prev;
    });
  }, []);

  const handleResetVideos = useCallback(() => {
    if (window.confirm('모든 로컬 수정을 취소하고 constants.ts에 저장된 파일 원본 상태로 되돌리시겠습니까?')) {
      setVideos([...KPOP_VIDEOS]);
      localStorage.removeItem('theart_videos_v2');
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