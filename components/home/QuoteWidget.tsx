
import React, { useRef, useState } from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { Quote } from '../../types';

interface QuoteWidgetProps {
    quote: Quote;
}

export const QuoteWidget: React.FC<QuoteWidgetProps> = ({ quote }) => {
    const [isLiked, setIsLiked] = useState(false);
    const lastTapRef = useRef<number>(0);

    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
            setIsLiked(!isLiked);
        }
        lastTapRef.current = now;
    };

    return (
        <div 
            className="relative overflow-hidden p-8 bg-academic-paper dark:bg-stone-900 border border-academic-line dark:border-stone-800 shadow-sm group select-none cursor-pointer active:scale-[0.99] transition-transform rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-700"
            onClick={handleDoubleTap}
        >
            <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-stone-300 dark:text-stone-600'}`} />
            </div>
            <div className="mb-8">
                <BookOpen className="w-6 h-6 text-academic-gold opacity-80 mb-6" />
                <blockquote className="font-serif text-2xl md:text-3xl text-academic-text dark:text-stone-100 leading-relaxed">
                    "{quote?.text || "The study of politics is the study of influence and the influential."}"
                </blockquote>
            </div>
            <div className="flex items-end justify-between border-t border-stone-100 dark:border-stone-800 pt-6">
                <div className="flex flex-col gap-1">
                    <cite className="not-italic font-sans text-sm font-bold uppercase tracking-widest text-academic-text dark:text-stone-300">
                        {quote?.author || "Harold Lasswell"}
                    </cite>
                    <span className="font-mono text-[10px] text-stone-500 dark:text-stone-500 uppercase tracking-widest">
                        {quote?.region || "Global"} • {quote?.year || "1936"}
                    </span>
                </div>
            </div>
        </div>
    );
};
