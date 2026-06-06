
import React from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: string;
    margin?: string;
    bg?: string;
    border?: string;
    radius?: string;
}

export const Box: React.FC<BoxProps> = ({ 
    padding = 'p-0', 
    margin = 'm-0', 
    bg = 'bg-transparent', 
    border = 'border-none', 
    radius = 'rounded-none',
    className = '',
    children, 
    ...props 
}) => {
    return (
        <div className={`${padding} ${margin} ${bg} ${border} ${radius} ${className}`} {...props}>
            {children}
        </div>
    );
};
