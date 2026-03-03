
import React from 'react';

interface DividerProps {
    vertical?: boolean;
    className?: string;
}

export const Divider: React.FC<DividerProps> = ({ vertical = false, className = '' }) => {
    const baseClass = "bg-stone-200 dark:bg-stone-800";
    const dimClass = vertical ? "w-px h-full mx-2" : "h-px w-full my-2";
    
    return <div className={`${baseClass} ${dimClass} ${className}`} />;
};
