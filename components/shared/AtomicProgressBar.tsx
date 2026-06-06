
import React from 'react';

interface AtomicProgressBarProps {
    value: number;
    max: number;
    color?: string;
    height?: string;
    label?: string;
    showValue?: boolean;
}

export const AtomicProgressBar: React.FC<AtomicProgressBarProps> = ({ 
    value, 
    max, 
    color = "bg-academic-accent", 
    height = "h-2",
    label,
    showValue = false
}) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className="w-full">
            {(label || showValue) && (
                <div className="flex justify-between mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {label && <span>{label}</span>}
                    {showValue && <span>{Math.round(percentage)}%</span>}
                </div>
            )}
            <div className={`w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden ${height}`}>
                <div 
                    className={`h-full rounded-full transition-all duration-500 ${color}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
