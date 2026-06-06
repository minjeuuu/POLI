
import React from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, side = 'right' }) => {
    const slideClass = side === 'right' ? 'slide-in-from-right' : 'slide-in-from-left';
    const posClass = side === 'right' ? 'right-0' : 'left-0';
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-[70]">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className={`absolute top-0 bottom-0 ${posClass} w-80 bg-white dark:bg-stone-950 shadow-2xl animate-in ${slideClass} duration-300 border-${side === 'left' ? 'r' : 'l'} border-stone-200 dark:border-stone-800`}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2"><X className="w-5 h-5" /></button>
                <div className="h-full overflow-y-auto p-6 pt-16">
                    {children}
                </div>
            </div>
        </div>
    );
};
