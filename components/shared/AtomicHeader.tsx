
import React from 'react';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { playSFX } from '../../services/soundService';

interface AtomicHeaderProps {
    title: string;
    subtitle?: string;
    onBack: () => void;
    onToggleSave?: () => void;
    isSaved?: boolean;
    rightActions?: React.ReactNode;
}

export const AtomicHeader: React.FC<AtomicHeaderProps> = ({ 
    title, subtitle, onBack, onToggleSave, isSaved, rightActions 
}) => {
    return (
        <div className="flex-none h-16 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-6 z-50 shadow-sm print:hidden">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => { playSFX('close'); onBack(); }} 
                    className="p-2 -ml-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="overflow-hidden">
                    <h1 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 truncate max-w-[200px] md:max-w-md">{title}</h1>
                    {subtitle && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-academic-gold block truncate">{subtitle}</span>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {rightActions}
                {onToggleSave && (
                    <button 
                        onClick={onToggleSave} 
                        className={`p-2 rounded-full transition-colors ${isSaved ? 'text-academic-gold bg-stone-50 dark:bg-stone-800' : 'text-stone-400 hover:text-academic-accent hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                    >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                )}
            </div>
        </div>
    );
};
