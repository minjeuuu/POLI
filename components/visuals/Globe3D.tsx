
import React from 'react';
import { Globe } from 'lucide-react';

export const Globe3D: React.FC = () => {
    return (
        <div className="w-full aspect-square rounded-full bg-gradient-to-br from-blue-900 to-black flex items-center justify-center shadow-2xl relative overflow-hidden group cursor-grab active:cursor-grabbing">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg')] bg-cover opacity-50 animate-pulse-slow"></div>
            <Globe className="w-32 h-32 text-blue-400 opacity-80 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
    );
};
