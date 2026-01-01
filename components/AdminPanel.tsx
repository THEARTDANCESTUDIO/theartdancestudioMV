
import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, RefreshCw, Copy, Check, Download } from 'lucide-react';
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

  const copyDataForDeploy = () => {
    const code = `export const KPOP_VIDEOS: Video[] = ${JSON.stringify(videos, null, 2)};`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000] bg-zinc-950 border-t-2 border-red-600 p-4 md:p-6 shadow-[0_-30px_100px_rgba(0,0,0,1)] animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-[10px] font-black tracking-widest text-red-500 flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              {t.title}
            </h2>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={copyDataForDeploy}
                className={`text-[10px] font-black flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
                  copied 
                  ? 'bg-green-600 border-green-500 text-white' 
                  : 'bg-white text-black border-white hover:bg-neutral-200'
                }`}
              >
                {copied ? <Check size={14} /> : <Download size={14} />}
                {copied ? 'COPIED TO CLIPBOARD!' : '배포용 데이터 복사 (COPY DATA)'}
              </button>
              
              {copied && (
                <span className="text-[9px] font-bold text-green-500 animate-pulse">
                  복사된 내용을 constants.ts의 KPOP_VIDEOS에 붙여넣으세요!
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onReset}
              className="text-[10px] font-bold text-white/30 hover:text-red-500 flex items-center gap-1.5 transition-colors px-3 py-2 hover:bg-white/5 rounded"
            >
              <RefreshCw size={12} /> RESET ALL
            </button>
            <button onClick={onClose} className="text-white/40 hover:text-white bg-white/5 p-2.5 rounded-full transition-all hover:bg-white/10">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase">{t.addNew}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder={t.fieldTitle} required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-[11px] rounded-lg outline-none focus:border-red-600/50 text-white transition-all font-bold uppercase tracking-tight"
                value={newVideo.title || ''}
                onChange={e => setNewVideo({...newVideo, title: e.target.value})}
              />
              <input 
                type="text" placeholder={t.fieldArtist} required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-[11px] rounded-lg outline-none focus:border-red-600/50 text-white transition-all font-bold uppercase tracking-tight"
                value={newVideo.artist || ''}
                onChange={e => setNewVideo({...newVideo, artist: e.target.value})}
              />
              <input 
                type="text" placeholder={t.fieldYoutube} required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-[11px] rounded-lg outline-none focus:border-red-600/50 text-white transition-all font-bold"
                value={newVideo.youtubeId || ''}
                onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})}
              />
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-[10px] font-black tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-xl shadow-red-600/20"
              >
                <Plus size={16} /> {t.addBtn}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black tracking-widest text-white/40 mb-4 uppercase">{t.manage} ({videos.length})</h3>
            <div className="overflow-y-auto max-h-[350px] pr-2 custom-scrollbar space-y-2">
              {videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-black/30 border border-dashed border-white/10 rounded-xl text-white/20 italic text-xs">
                  리스트가 비어있습니다.
                </div>
              ) : (
                videos.map((video, idx) => (
                  <div key={video.id} className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
                    <div className="w-24 h-14 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter">{video.title}</p>
                      <p className="text-[9px] font-bold text-white/30 italic uppercase">{video.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => onMove(video.id, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 hover:bg-white hover:text-black rounded-md text-white/20 disabled:opacity-0 transition-all"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button 
                          onClick={() => onMove(video.id, 'down')}
                          disabled={idx === videos.length - 1}
                          className="p-1.5 hover:bg-white hover:text-black rounded-md text-white/20 disabled:opacity-0 transition-all"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`'${video.title}' 영상을 정말 삭제하시겠습니까?`)) {
                            onDelete(video.id);
                          }
                        }}
                        className="p-4 hover:bg-red-600 hover:text-white rounded-xl text-red-600/40 transition-all ml-2"
                      >
                        <Trash2 size={20} />
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(220, 38, 38, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(220, 38, 38, 0.6); }
      `}</style>
    </div>
  );
};

export default AdminPanel;
