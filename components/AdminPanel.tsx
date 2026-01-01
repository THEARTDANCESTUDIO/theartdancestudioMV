import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, RefreshCw, Copy, Check, Terminal, FileCode } from 'lucide-react';
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

  const copyFullConstantsFile = () => {
    // TRANSLATIONS와 NAV_LINKS는 기존 값을 유지하고 KPOP_VIDEOS만 현재 상태로 업데이트한 파일 전체 내용 생성
    const fileContent = `import { Video } from './types.ts';

export const TRANSLATIONS = ${JSON.stringify(TRANSLATIONS, null, 2)} as const;

export const NAV_LINKS: { labelKey: keyof typeof TRANSLATIONS.EN.nav; href: string }[] = [
  { labelKey: 'dancers', href: '#' },
  { labelKey: 'classes', href: '#' },
  { labelKey: 'tickets', href: '#' },
  { labelKey: 'store', href: '#' },
  { labelKey: 'about', href: '#' },
  { labelKey: 'account', href: '#' },
];

export const KPOP_VIDEOS: Video[] = ${JSON.stringify(videos, null, 2)};`;

    navigator.clipboard.writeText(fileContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      alert('constants.ts 파일 전체 내용이 복사되었습니다! constants.ts 파일에 붙여넣고 배포하세요.');
    });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000] bg-zinc-950 border-t-2 border-red-600 p-4 md:p-6 shadow-[0_-40px_100px_rgba(0,0,0,1)] animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-[10px] font-black tracking-widest text-red-500 flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20 uppercase">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              {t.title}
            </h2>
            
            <button 
              onClick={copyFullConstantsFile}
              className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all border-2 ${
                copied 
                ? 'bg-green-600 border-green-500 text-white' 
                : 'bg-white text-black border-white hover:bg-neutral-200 scale-105 active:scale-95 shadow-xl shadow-white/10'
              }`}
            >
              {copied ? <Check size={16} /> : <FileCode size={16} />}
              <span className="text-[11px] font-black uppercase tracking-tight">
                {copied ? '복사 완료! (constants.ts에 붙여넣으세요)' : '배포용 constants.ts 전체 복사'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onReset}
              className="text-[10px] font-bold text-white/30 hover:text-red-500 flex items-center gap-1.5 transition-colors px-3 py-2 hover:bg-white/5 rounded"
            >
              <RefreshCw size={12} /> 리셋 (파일 원본 상태로)
            </button>
            <button onClick={onClose} className="text-white/40 hover:text-white bg-white/5 p-2 rounded-full transition-all hover:bg-white/10">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 영상 추가 폼 */}
          <div className="bg-black/50 p-6 rounded-2xl border border-white/5 space-y-4 shadow-inner">
            <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase flex items-center gap-2">
               <Plus size={10} /> {t.addNew}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input 
                type="text" placeholder={t.fieldTitle} required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-[11px] rounded-xl outline-none focus:border-red-600/50 text-white transition-all font-bold uppercase"
                value={newVideo.title || ''}
                onChange={e => setNewVideo({...newVideo, title: e.target.value})}
              />
              <input 
                type="text" placeholder={t.fieldArtist} required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-[11px] rounded-xl outline-none focus:border-red-600/50 text-white transition-all font-bold uppercase"
                value={newVideo.artist || ''}
                onChange={e => setNewVideo({...newVideo, artist: e.target.value})}
              />
              <input 
                type="text" placeholder={t.fieldYoutube} required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-[11px] rounded-xl outline-none focus:border-red-600/50 text-white transition-all font-bold"
                value={newVideo.youtubeId || ''}
                onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})}
              />
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-[10px] font-black tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-2xl shadow-red-600/30"
              >
                <Plus size={18} /> {t.addBtn}
              </button>
            </form>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
               <p className="text-[9px] text-white/50 leading-relaxed font-medium">
                💡 <strong className="text-white">배포 방법:</strong> 영상을 모두 추가한 후 상단의 <b>[배포용 constants.ts 전체 복사]</b> 버튼을 누르세요. 그 다음 <code>constants.ts</code> 파일의 내용을 모두 지우고 붙여넣으면 영구 배포됩니다.
               </p>
            </div>
          </div>

          {/* 목록 관리 */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-4">
               <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase">{t.manage} ({videos.length})</h3>
               <span className="text-[9px] text-white/20 italic uppercase tracking-tighter">Drag features coming soon...</span>
            </div>
            
            <div className="overflow-y-auto max-h-[400px] pr-2 custom-scrollbar space-y-2">
              {videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-black/30 border border-dashed border-white/10 rounded-2xl text-white/20 italic text-xs gap-4">
                  <Terminal size={40} className="opacity-10" />
                  현재 표시할 영상이 없습니다.
                </div>
              ) : (
                videos.map((video, idx) => (
                  <div key={video.id} className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all group relative">
                    <div className="w-24 h-14 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                      <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black text-white/20 px-1.5 py-0.5 border border-white/10 rounded uppercase">#{idx + 1}</span>
                        <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter">{video.title}</p>
                      </div>
                      <p className="text-[9px] font-bold text-white/30 italic uppercase">{video.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => onMove(video.id, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 hover:bg-white hover:text-black rounded-lg text-white/20 disabled:opacity-0 transition-all"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button 
                          onClick={() => onMove(video.id, 'down')}
                          disabled={idx === videos.length - 1}
                          className="p-1.5 hover:bg-white hover:text-black rounded-lg text-white/20 disabled:opacity-0 transition-all"
                        >
                          <ArrowDown size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`'${video.title}' 영상을 목록에서 삭제할까요?`)) {
                            onDelete(video.id);
                          }
                        }}
                        className="p-4 hover:bg-red-600 hover:text-white rounded-2xl text-red-600/40 transition-all ml-2"
                      >
                        <Trash2 size={22} />
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