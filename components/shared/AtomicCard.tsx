
import React from 'react';

interface AtomicCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
    interactive?: boolean;
}

export const AtomicCard: React.FC<AtomicCardProps> = ({ children, className = '', onClick, hoverEffect = true, interactive = false }) => {
    return (
        <div 
            onClick={onClick}
            className={`
                bg-white dark:bg-stone-900 
                border border-stone-200 dark:border-stone-800 
                rounded-2xl p-6 shadow-sm relative overflow-hidden
                ${hoverEffect ? 'hover:shadow-md transition-shadow duration-300' : ''}
                ${interactive ? 'cursor-pointer hover:border-academic-accent dark:hover:border-indigo-500 transition-colors active:scale-[0.99]' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
};
