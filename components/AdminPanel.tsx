
import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { Video, Language } from '../types.ts';
import { TRANSLATIONS } from '../constants.ts';

interface AdminPanelProps {
  videos: Video[];
  onAdd: (video: Video) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onReset: () => void;
  onClose: () => void;
  lang: Language;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ videos, onAdd, onDelete, onMove, onReset, onClose, lang }) => {
  const [newVideo, setNewVideo] = useState<Partial<Video>>({
    category: 'THEART M/V'
  });
  const t = TRANSLATIONS[lang].admin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVideo.title && newVideo.artist && newVideo.youtubeId) {
      const videoToAdd: Video = {
        id: `v-${Date.now()}`, // More explicit unique ID
        title: newVideo.title,
        artist: newVideo.artist,
        youtubeId: newVideo.youtubeId,
        thumbnail: `https://img.youtube.com/vi/${newVideo.youtubeId}/maxresdefault.jpg`,
        category: newVideo.category || 'THEART M/V'
      };
      onAdd(videoToAdd);
      setNewVideo({ category: 'THEART M/V' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000] bg-zinc-900 border-t-2 border-red-600 p-4 md:p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black tracking-widest text-red-500 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              {t.title}
            </h2>
            <button 
              onClick={onReset}
              className="text-[9px] font-bold text-white/30 hover:text-white flex items-center gap-1 transition-colors border border-white/10 px-2 py-1 rounded"
            >
              <RefreshCw size={10} /> RESET TO DEFAULT
            </button>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white bg-white/5 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-black/40 p-5 rounded-md border border-white/5">
            <h3 className="text-[10px] font-bold tracking-widest text-white/50 mb-4 uppercase">{t.addNew}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder={t.fieldTitle}
                className="w-full bg-zinc-800 border border-white/10 p-3 text-xs rounded outline-none focus:border-red-600/50 text-white"
                value={newVideo.title || ''}
                onChange={e => setNewVideo({...newVideo, title: e.target.value})}
              />
              <input 
                type="text" 
                placeholder={t.fieldArtist} 
                className="w-full bg-zinc-800 border border-white/10 p-3 text-xs rounded outline-none focus:border-red-600/50 text-white"
                value={newVideo.artist || ''}
                onChange={e => setNewVideo({...newVideo, artist: e.target.value})}
              />
              <input 
                type="text" 
                placeholder={t.fieldYoutube} 
                className="w-full bg-zinc-800 border border-white/10 p-3 text-xs rounded outline-none focus:border-red-600/50 text-white"
                value={newVideo.youtubeId || ''}
                onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})}
              />
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-[10px] font-black tracking-widest flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-red-600/20"
              >
                <Plus size={14} /> {t.addBtn}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold tracking-widest text-white/50 mb-4 uppercase">{t.manage} ({videos.length})</h3>
            <div className="overflow-y-auto max-h-[300px] pr-2 custom-scrollbar space-y-2">
              {videos.length === 0 && (
                <div className="text-center py-10 text-white/20 text-xs font-bold uppercase tracking-widest border border-dashed border-white/10 rounded">
                  No videos in playlist
                </div>
              )}
              {videos.map((video, idx) => (
                <div key={video.id} className="flex items-center gap-4 bg-black/40 p-3 rounded border border-white/5 group hover:border-red-600/30 transition-all">
                  <div className="w-24 h-14 bg-zinc-800 rounded overflow-hidden flex-shrink-0 relative">
                    <img src={video.thumbnail} className="w-full h-full object-cover opacity-60" alt="" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[8px] font-black text-white/20">#{idx + 1}</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[11px] font-black text-white truncate uppercase">{video.title}</p>
                    <p className="text-[9px] font-bold text-white/40 italic uppercase">{video.artist}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col gap-1 mr-2">
                      <button 
                        onClick={() => onMove(video.id, 'up')}
                        disabled={idx === 0}
                        className="p-1 hover:bg-zinc-800 rounded text-white/40 hover:text-white disabled:opacity-5 transition-colors"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        onClick={() => onMove(video.id, 'down')}
                        disabled={idx === videos.length - 1}
                        className="p-1 hover:bg-zinc-800 rounded text-white/40 hover:text-white disabled:opacity-5 transition-colors"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        if (window.confirm('이 영상을 목록에서 삭제하시겠습니까?')) {
                          onDelete(video.id);
                        }
                      }}
                      className="p-3 hover:bg-red-600/20 rounded-full text-white/20 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.5);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
