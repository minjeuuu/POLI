
import React from 'react';
import { Check, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', visible }) => {
    const colors = {
        success: 'bg-emerald-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };
    
    return (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className={`${colors[type]} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3`}>
                {type === 'success' && <Check className="w-4 h-4" />}
                {type === 'error' && <AlertCircle className="w-4 h-4" />}
                {type === 'info' && <Info className="w-4 h-4" />}
                <span className="text-xs font-bold uppercase tracking-widest">{message}</span>
            </div>
        </div>
    );
};
