
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
    id: string;
    label: string;
    icon: LucideIcon;
    active: boolean;
    onClick: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({ id, label, icon: Icon, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all text-left border-l-4
        ${active 
            ? 'bg-stone-100 dark:bg-stone-800 text-academic-accent dark:text-indigo-400 border-academic-accent dark:border-indigo-500' 
            : 'text-stone-500 dark:text-stone-400 border-transparent hover:bg-stone-50 dark:hover:bg-stone-800/50'}`}
    >
        <Icon className={`w-4 h-4 ${active ? 'text-academic-gold' : 'opacity-70'}`} />
        <span className="truncate">{label}</span>
    </button>
);
