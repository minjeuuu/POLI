
import React from 'react';
import { Trophy, Star, Shield, Zap, BookOpen } from 'lucide-react';

interface AchievementBadgeProps {
    title: string;
    description: string;
    icon?: 'Trophy' | 'Star' | 'Shield' | 'Zap' | 'Book';
    unlocked?: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ title, description, icon = 'Trophy', unlocked = false }) => {
    const Icons = { Trophy, Star, Shield, Zap, Book: BookOpen };
    const Icon = Icons[icon];

    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${unlocked ? 'bg-academic-gold/10 border-academic-gold/30' : 'bg-stone-100 dark:bg-stone-800 border-transparent opacity-50 grayscale'}`}>
            <div className={`p-2 rounded-full ${unlocked ? 'bg-academic-gold text-white shadow-md' : 'bg-stone-200 dark:bg-stone-700 text-stone-400'}`}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${unlocked ? 'text-stone-800 dark:text-stone-100' : 'text-stone-500'}`}>{title}</h4>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight">{description}</p>
            </div>
        </div>
    );
};
