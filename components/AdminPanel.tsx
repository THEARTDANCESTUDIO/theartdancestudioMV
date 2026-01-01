
import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Video, Language } from '../types.ts';
import { TRANSLATIONS } from '../constants.ts';

interface AdminPanelProps {
  videos: Video[];
  onAdd: (video: Video) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onClose: () => void;
  lang: Language;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ videos, onAdd, onDelete, onMove, onClose, lang }) => {
  const [newVideo, setNewVideo] = useState<Partial<Video>>({
    category: 'THEART M/V'
  });
  const t = TRANSLATIONS[lang].admin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVideo.title && newVideo.artist && newVideo.youtubeId) {
      const videoToAdd: Video = {
        id: Date.now().toString(),
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
    <div className="fixed bottom-0 left-0 w-full z-[1000] bg-zinc-900 border-t border-red-600/30 p-4 md:p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-black tracking-widest text-red-500 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          {t.title}
        </h2>
        <button onClick={onClose} className="text-white/40 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-black/40 p-4 rounded-md border border-white/5">
          <h3 className="text-[10px] font-bold tracking-widest text-white/50 mb-4 uppercase">{t.addNew}</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              type="text" 
              placeholder={t.fieldTitle}
              className="w-full bg-zinc-800 border border-white/10 p-2 text-xs rounded outline-none focus:border-red-600/50"
              value={newVideo.title || ''}
              onChange={e => setNewVideo({...newVideo, title: e.target.value})}
            />
            <input 
              type="text" 
              placeholder={t.fieldArtist} 
              className="w-full bg-zinc-800 border border-white/10 p-2 text-xs rounded outline-none focus:border-red-600/50"
              value={newVideo.artist || ''}
              onChange={e => setNewVideo({...newVideo, artist: e.target.value})}
            />
            <input 
              type="text" 
              placeholder={t.fieldYoutube} 
              className="w-full bg-zinc-800 border border-white/10 p-2 text-xs rounded outline-none focus:border-red-600/50"
              value={newVideo.youtubeId || ''}
              onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})}
            />
            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-[10px] font-black tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={14} /> {t.addBtn}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
          <h3 className="text-[10px] font-bold tracking-widest text-white/50 mb-4 uppercase">{t.manage}</h3>
          <div className="space-y-2">
            {videos.map((video, idx) => (
              <div key={video.id} className="flex items-center gap-4 bg-black/40 p-2 rounded border border-white/5 group">
                <div className="w-16 h-10 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                  <img src={video.thumbnail} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-black text-white">{video.title}</p>
                  <p className="text-[9px] font-bold text-white/40 italic uppercase">{video.artist}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => onMove(video.id, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 hover:bg-zinc-800 rounded text-white/40 hover:text-white disabled:opacity-10 transition-colors"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button 
                    onClick={() => onMove(video.id, 'down')}
                    disabled={idx === videos.length - 1}
                    className="p-1.5 hover:bg-zinc-800 rounded text-white/40 hover:text-white disabled:opacity-10 transition-colors"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button 
                    onClick={() => onDelete(video.id)}
                    className="p-1.5 hover:bg-red-900/40 rounded text-white/40 hover:text-red-500 transition-colors ml-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
