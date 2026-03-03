
import React from 'react';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'col';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    align?: 'start' | 'center' | 'end' | 'stretch';
    gap?: string;
    wrap?: boolean;
}

export const Flex: React.FC<FlexProps> = ({ 
    direction = 'row', 
    justify = 'start', 
    align = 'stretch', 
    gap = 'gap-0', 
    wrap = false,
    className = '',
    children, 
    ...props 
}) => {
    const dirClass = direction === 'col' ? 'flex-col' : 'flex-row';
    const justifyClass = `justify-${justify}`;
    const alignClass = `items-${align}`;
    const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

    return (
        <div className={`flex ${dirClass} ${justifyClass} ${alignClass} ${gap} ${wrapClass} ${className}`} {...props}>
            {children}
        </div>
    );
};
