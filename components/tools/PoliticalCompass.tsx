
import React, { useState } from 'react';
import { Move, Info, RotateCcw } from 'lucide-react';

interface Point {
    x: number; // -10 to 10 (Left/Right)
    y: number; // -10 to 10 (Lib/Auth)
    label: string;
    color: string;
}

const DEFAULT_POINTS: Point[] = [
    { x: -5, y: -5, label: "Libertarian Left", color: "bg-green-500" },
    { x: 5, y: -5, label: "Libertarian Right", color: "bg-purple-500" },
    { x: -5, y: 5, label: "Authoritarian Left", color: "bg-red-500" },
    { x: 5, y: 5, label: "Authoritarian Right", color: "bg-blue-500" },
    { x: 0, y: 0, label: "Centrist", color: "bg-gray-500" }
];

export const PoliticalCompass: React.FC = () => {
    const [points, setPoints] = useState<Point[]>(DEFAULT_POINTS);
    const [hovered, setHovered] = useState<Point | null>(null);

    // Coordinate conversion
    const toPercent = (val: number) => ((val + 10) / 20) * 100;

    return (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <Move className="w-4 h-4" /> Political Spectrum
                </h3>
                <button onClick={() => setPoints(DEFAULT_POINTS)} className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-400">
                    <RotateCcw className="w-3 h-3" />
                </button>
            </div>

            <div className="aspect-square relative border-2 border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 rounded-lg overflow-hidden">
                {/* Axes */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-stone-300 dark:bg-stone-600"></div>
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-stone-300 dark:bg-stone-600"></div>
                
                {/* Labels */}
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-stone-400 uppercase">Authoritarian</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-stone-400 uppercase">Libertarian</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] font-bold text-stone-400 uppercase -rotate-90">Economic Left</span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-bold text-stone-400 uppercase rotate-90">Economic Right</span>

                {/* Points */}
                {points.map((p, i) => (
                    <div 
                        key={i}
                        className={`absolute w-3 h-3 rounded-full border-2 border-white dark:border-stone-900 shadow-sm cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-150 ${p.color}`}
                        style={{ left: `${toPercent(p.x)}%`, top: `${100 - toPercent(p.y)}%` }} // Invert Y for standard graph behavior
                        onMouseEnter={() => setHovered(p)}
                        onMouseLeave={() => setHovered(null)}
                    ></div>
                ))}
            </div>

            {hovered ? (
                <div className="mt-4 p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-center animate-in fade-in duration-200">
                    <span className="font-bold text-sm text-stone-800 dark:text-stone-200">{hovered.label}</span>
                    <div className="text-[10px] font-mono text-stone-500">X: {hovered.x}, Y: {hovered.y}</div>
                </div>
            ) : (
                <div className="mt-4 p-3 text-center text-xs text-stone-400 italic">
                    Hover over points to see details.
                </div>
            )}
        </div>
    );
};
