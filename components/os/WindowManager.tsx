
import React, { useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { TerminalApp } from '../apps/TerminalApp';
import { MusicPlayerApp } from '../apps/MusicPlayerApp';
import { BrowserApp } from '../apps/BrowserApp';
import { playSFX } from '../../services/soundService';

interface WindowProps {
    id: string;
    title: string;
    component: React.ReactNode;
    onClose: (id: string) => void;
    isActive: boolean;
    onFocus: () => void;
}

const Window: React.FC<WindowProps> = ({ id, title, component, onClose, isActive, onFocus }) => {
    return (
        <div 
            className={`absolute top-20 left-10 md:left-1/4 w-[90vw] md:w-[600px] h-[500px] bg-white dark:bg-stone-900 rounded-lg shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col transition-all duration-200 ${isActive ? 'z-50 scale-100 ring-2 ring-academic-accent/50' : 'z-40 scale-95 opacity-80 grayscale'}`}
            onClick={onFocus}
            style={{ transform: `translate(${isActive ? 0 : 20}px, ${isActive ? 0 : 20}px)` }} // Simple stack effect
        >
            <div className="h-8 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between px-3 cursor-move">
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); playSFX('close'); onClose(id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></button>
                    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></button>
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></button>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{title}</span>
                <div className="w-12"></div>
            </div>
            <div className="flex-1 overflow-hidden relative">
                {component}
            </div>
        </div>
    );
};

export const WindowManager: React.FC<{ activeApps: string[], onCloseApp: (id: string) => void }> = ({ activeApps, onCloseApp }) => {
    const [focusedApp, setFocusedApp] = useState<string | null>(null);

    const handleFocus = (id: string) => {
        setFocusedApp(id);
    };

    return (
        <div className="absolute inset-0 pointer-events-none">
            {activeApps.map(appId => {
                let Component = null;
                let title = "";
                
                switch(appId) {
                    case 'terminal': Component = <TerminalApp />; title = "Terminal"; break;
                    case 'music': Component = <MusicPlayerApp />; title = "PoliTunes"; break;
                    case 'browser': Component = <BrowserApp />; title = "Global Net"; break;
                    default: return null;
                }

                return (
                    <div key={appId} className="pointer-events-auto">
                        <Window 
                            id={appId} 
                            title={title} 
                            component={Component} 
                            onClose={onCloseApp} 
                            isActive={focusedApp === appId || activeApps[activeApps.length-1] === appId}
                            onFocus={() => handleFocus(appId)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
