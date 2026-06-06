
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DetailCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subValue?: string;
    onClick?: () => void;
}

export const DetailCard: React.FC<DetailCardProps> = ({ label, value, icon: Icon, subValue, onClick }) => (
    <div 
        onClick={onClick}
        className={`bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm transition-all group ${onClick ? 'cursor-pointer hover:border-academic-gold hover:-translate-y-1' : ''}`}
    >
        <div className="flex items-center gap-2 mb-3 text-stone-400 group-hover:text-academic-gold transition-colors">
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </div>
        <div className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 leading-tight">{value}</div>
        {subValue && <div className="text-xs text-stone-500 mt-1 font-mono">{subValue}</div>}
    </div>
);
