
import React from 'react';

interface HeatMapProps {
    data: number[][]; // 2D array of intensity 0-1
    labelsX?: string[];
    labelsY?: string[];
}

export const HeatMap: React.FC<HeatMapProps> = ({ data, labelsX, labelsY }) => {
    const getColor = (value: number) => {
        // Simple red heat scale
        const intensity = Math.floor(value * 255);
        return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
    };

    return (
        <div className="overflow-x-auto">
            <div className="min-w-max">
                {labelsX && (
                    <div className="flex pl-10 mb-2">
                        {labelsX.map((label, i) => (
                            <div key={i} className="w-10 text-[9px] text-center text-stone-400 -rotate-45 origin-bottom-left">{label}</div>
                        ))}
                    </div>
                )}
                {data.map((row, i) => (
                    <div key={i} className="flex items-center gap-1 mb-1">
                        {labelsY && <div className="w-10 text-[9px] text-right pr-2 text-stone-400">{labelsY[i]}</div>}
                        {row.map((val, j) => (
                            <div 
                                key={j} 
                                className="w-8 h-8 rounded-sm transition-colors hover:border border-black/10"
                                style={{ backgroundColor: getColor(val) }}
                                title={`${val.toFixed(2)}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
