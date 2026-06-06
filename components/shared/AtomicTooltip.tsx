
import React from 'react';

export const AtomicTooltip: React.FC<{ content: string, children: React.ReactNode }> = ({ content, children }) => (
    <div className="group relative flex items-center">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
        </div>
    </div>
);
