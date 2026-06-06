
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionWrapperProps {
    id: string;
    title: string;
    icon: LucideIcon;
    subtitle?: string;
    children: React.ReactNode;
    setRef: (el: HTMLElement | null) => void;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, icon: Icon, subtitle, children, setRef }) => (
    <section id={id} ref={setRef} className="scroll-mt-24 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-stone-100 dark:border-stone-800">
            <div className="p-3 bg-academic-bg dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-academic-gold shadow-sm">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-xl font-bold uppercase tracking-[0.25em] text-academic-text dark:text-stone-100">{title}</h3>
                {subtitle && <p className="text-xs text-stone-400 font-mono uppercase tracking-widest mt-1">{subtitle}</p>}
            </div>
        </div>
        {children}
    </section>
);
