
import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, RefreshCw, Copy, Check } from 'lucide-react';
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
  const [newVideo, setNewVideo] = useState<Partial<Video>>({ category: 'THEART M/V' });
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang].admin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVideo.title && newVideo.artist && newVideo.youtubeId) {
      const videoToAdd: Video = {
        id: `vid-${Date.now()}`,
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

  const copyToClipboard = () => {
    const code = JSON.stringify(videos, null, 2);
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert('현재 리스트가 복사되었습니다! constants.ts의 KPOP_VIDEOS에 붙여넣어 영구 배포하세요.');
    });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000] bg-zinc-950 border-t-2 border-red-600 p-4 md:p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black tracking-widest text-red-500 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              {t.title}
            </h2>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
            <button 
              onClick={copyToClipboard}
              className="text-[10px] font-black text-white hover:bg-white hover:text-black flex items-center gap-2 transition-all border border-white/20 px-3 py-1.5 rounded-full"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              COPY FOR DEPLOY (constants.ts)
            </button>
            <button 
              onClick={onReset}
              className="text-[10px] font-bold text-white/30 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <RefreshCw size={10} /> RESET
            </button>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white bg-white/5 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Section */}
          <div className="bg-black p-5 rounded-md border border-white/5 shadow-inner">
            <h3 className="text-[10px] font-bold tracking-widest text-white/50 mb-4 uppercase">{t.addNew}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder={t.fieldTitle}
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs rounded outline-none focus:border-red-600/50 text-white transition-all"
                value={newVideo.title || ''}
                onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder={t.fieldArtist} 
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs rounded outline-none focus:border-red-600/50 text-white transition-all"
                value={newVideo.artist || ''}
                onChange={e => setNewVideo({...newVideo, artist: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder={t.fieldYoutube} 
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs rounded outline-none focus:border-red-600/50 text-white transition-all"
                value={newVideo.youtubeId || ''}
                onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})}
                required
              />
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded text-[10px] font-black tracking-widest flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-red-600/20"
              >
                <Plus size={14} /> {t.addBtn}
              </button>
            </form>
          </div>

          {/* List Manage Section */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold tracking-widest text-white/50 mb-4 uppercase">{t.manage} ({videos.length})</h3>
            <div className="overflow-y-auto max-h-[320px] pr-2 custom-scrollbar space-y-2">
              {videos.length === 0 ? (
                <div className="text-center py-16 text-white/20 text-xs font-bold uppercase tracking-widest border border-dashed border-white/10 rounded">
                  Playlist is empty
                </div>
              ) : (
                videos.map((video, idx) => (
                  <div key={video.id} className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded border border-white/5 group hover:border-white/20 transition-all">
                    <div className="w-24 h-14 bg-black rounded overflow-hidden flex-shrink-0 relative">
                      <img src={video.thumbnail} className="w-full h-full object-cover opacity-60" alt="" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-[8px] font-black text-white/40">#{idx + 1}</span>
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[11px] font-black text-white truncate uppercase">{video.title}</p>
                      <p className="text-[9px] font-bold text-white/40 italic uppercase">{video.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onMove(video.id, 'up'); }}
                          disabled={idx === 0}
                          className="p-1.5 hover:bg-white hover:text-black rounded text-white/20 disabled:opacity-0 transition-all"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onMove(video.id, 'down'); }}
                          disabled={idx === videos.length - 1}
                          className="p-1.5 hover:bg-white hover:text-black rounded text-white/20 disabled:opacity-0 transition-all"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`'${video.title}' 영상을 삭제하시겠습니까?`)) {
                            onDelete(video.id);
                          }
                        }}
                        className="p-3 hover:bg-red-600 hover:text-white rounded text-red-600/50 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
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
