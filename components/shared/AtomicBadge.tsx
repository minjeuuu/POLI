
import React from 'react';

interface AtomicBadgeProps {
    label: string;
    variant?: 'neutral' | 'accent' | 'gold' | 'success' | 'danger' | 'info';
    icon?: React.ElementType;
}

export const AtomicBadge: React.FC<AtomicBadgeProps> = ({ label, variant = 'neutral', icon: Icon }) => {
    const variants = {
        neutral: "bg-stone-100 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700",
        accent: "bg-academic-accent/10 dark:bg-indigo-500/10 text-academic-accent dark:text-indigo-400 border-academic-accent/20",
        gold: "bg-academic-gold/10 text-academic-gold border-academic-gold/20",
        success: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100",
        danger: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100",
        info: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100"
    };

    return (
        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit ${variants[variant]}`}>
            {Icon && <Icon className="w-3 h-3" />}
            {label}
        </span>
    );
};
