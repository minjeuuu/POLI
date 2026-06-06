
import React from 'react';
import { Crosshair } from 'lucide-react';

export const SimMap: React.FC<{ mapString: string }> = ({ mapString }) => (
    <div className="bg-stone-900 p-6 rounded-3xl shadow-lg border border-stone-800 relative overflow-hidden">
        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-red-500" /> Tactical Map
        </h3>
        <div className="grid grid-cols-5 gap-2 aspect-square max-w-[200px] mx-auto">
            {mapString.split('\n').map((row, y) => (
                row.split('').map((cell, x) => (
                    <div key={`${x}-${y}`} className={`w-full aspect-square rounded-sm border border-white/10 ${
                        cell === '1' ? 'bg-red-600 animate-pulse' : 
                        cell === '2' ? 'bg-blue-500' : 
                        cell === '3' ? 'bg-green-500' : 'bg-stone-800'
                    }`}></div>
                ))
            ))}
        </div>
    </div>
);
