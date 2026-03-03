
import React from 'react';
import { Hash, Lock, Volume2 } from 'lucide-react';

const CHANNELS = [
    { name: 'general', type: 'text', private: false },
    { name: 'theory-club', type: 'text', private: false },
    { name: 'strategy-room', type: 'text', private: true },
    { name: 'voice-lounge', type: 'voice', private: false },
];

export const ChannelList: React.FC = () => {
    return (
        <div className="mt-8 space-y-6">
            <div>
                <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Channels</h4>
                <div className="space-y-0.5">
                    {CHANNELS.map((c, i) => (
                        <button key={i} className="w-full flex items-center gap-2 px-4 py-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-800 dark:hover:text-stone-200 transition-colors group">
                            {c.type === 'voice' ? <Volume2 className="w-4 h-4" /> : c.private ? <Lock className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                            <span className="text-xs font-bold">{c.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div>
                <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Direct Messages</h4>
                <div className="space-y-0.5">
                    {['Dr. Thorne', 'Elena Vance', 'Scholar_01'].map((u, i) => (
                        <button key={i} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group">
                            <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-500">
                                {u.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-stone-500 group-hover:text-stone-800 dark:group-hover:text-stone-200">{u}</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
