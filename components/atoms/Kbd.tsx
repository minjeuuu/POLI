
import React from 'react';

export const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <kbd className="px-1.5 py-0.5 text-[9px] font-sans font-bold text-stone-500 bg-stone-100 border border-stone-300 rounded-md dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400">
        {children}
    </kbd>
);
