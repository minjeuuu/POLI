
import React from 'react';
import { Sparkles } from 'lucide-react';

interface SynthesisWidgetProps {
    text: string;
}

export const SynthesisWidget: React.FC<SynthesisWidgetProps> = ({ text }) => {
    return (
        <section className="bg-academic-accent dark:bg-indigo-900 text-white p-8 rounded-lg shadow-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
            </div>
            <h2 className="text-[10px] font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 relative z-10">Daily Synthesis</h2>
            <div className="prose prose-invert max-w-none font-serif text-lg leading-relaxed opacity-90 relative z-10 columns-1 md:columns-2 gap-8 text-justify">
                <p>{text || "Data processing in progress..."}</p>
            </div>
        </section>
    );
};
