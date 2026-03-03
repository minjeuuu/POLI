
import React from 'react';

interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono';
    color?: string;
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    className?: string;
}

export const Text: React.FC<TextProps> = ({ variant = 'body', color, weight = 'normal', children, className = '' }) => {
    let baseStyle = '';
    switch(variant) {
        case 'h1': baseStyle = 'text-4xl font-serif leading-tight'; break;
        case 'h2': baseStyle = 'text-2xl font-serif leading-tight'; break;
        case 'h3': baseStyle = 'text-xl font-serif font-bold'; break;
        case 'body': baseStyle = 'text-base font-sans leading-relaxed'; break;
        case 'caption': baseStyle = 'text-xs font-sans uppercase tracking-widest'; break;
        case 'mono': baseStyle = 'text-xs font-mono'; break;
    }
    
    const weightClass = weight === 'bold' ? 'font-bold' : weight === 'medium' ? 'font-medium' : 'font-normal';
    const colorClass = color || 'text-current';

    return <span className={`${baseStyle} ${weightClass} ${colorClass} ${className}`}>{children}</span>;
};
