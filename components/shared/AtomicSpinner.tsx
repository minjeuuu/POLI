
import React from 'react';
import { Loader2 } from 'lucide-react';

interface AtomicSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'text-academic-accent' | 'text-white' | 'text-stone-400';
    className?: string;
}

export const AtomicSpinner: React.FC<AtomicSpinnerProps> = ({ size = 'md', color = 'text-academic-accent', className = '' }) => {
    const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-12 h-12" };
    return (
        <Loader2 className={`${sizes[size]} ${color} animate-spin ${className}`} />
    );
};
