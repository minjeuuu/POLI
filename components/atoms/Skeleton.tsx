
import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
    width = "100%", 
    height = "1rem", 
    borderRadius = "0.25rem",
    className = "" 
}) => {
    return (
        <div 
            className={`bg-stone-200 dark:bg-stone-800 animate-pulse ${className}`}
            style={{ width, height, borderRadius }}
        ></div>
    );
};
