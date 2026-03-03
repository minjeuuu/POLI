
import React from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    gap?: string;
}

export const Grid: React.FC<GridProps> = ({ cols = 1, gap = 'gap-4', className = '', children, ...props }) => {
    const colMap = {
        1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 
        4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12'
    };
    return (
        <div className={`grid ${colMap[cols]} ${gap} ${className}`} {...props}>
            {children}
        </div>
    );
};
