
import React from 'react';
import { Terminal, Music, Globe, FileText, Settings, Grid } from 'lucide-react';
import { playSFX } from '../../services/soundService';

interface DockProps {
    onLaunch: (appId: string) => void;
}

const APPS = [
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-black text-green-500' },
    { id: 'browser', icon: Globe, label: 'Browser', color: 'bg-blue-500 text-white' },
    { id: 'editor', icon: FileText, label: 'Editor', color: 'bg-stone-200 text-stone-700' },
    { id: 'music', icon: Music, label: 'Music', color: 'bg-pink-500 text-white' },
];

export const Dock: React.FC<DockProps> = ({ onLaunch }) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-2 rounded-2xl flex items-end gap-3 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
            {APPS.map((app) => (
                <button
                    key={app.id}
                    onClick={() => { playSFX('open'); onLaunch(app.id); }}
                    className="group relative flex flex-col items-center gap-1 transition-all hover:-translate-y-2"
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${app.color} transition-transform group-active:scale-95`}>
                        <app.icon className="w-6 h-6" />
                    </div>
                    <span className="absolute -top-8 bg-black/80 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-wider">
                        {app.label}
                    </span>
                    <div className="w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"></div>
                </button>
            ))}
            <div className="w-px h-10 bg-white/10 mx-1"></div>
            <button className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <Grid className="w-5 h-5" />
            </button>
        </div>
    );
};
