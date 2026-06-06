
import React from 'react';
import { AtomicProgressBar } from '../shared/AtomicProgressBar';

export const DemographicChart: React.FC<{ data: any[] }> = ({ data }) => (
    <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Population Pyramid</h4>
        {data.map((cohort, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
                <div className="flex-1 flex justify-end">
                    <div style={{ width: `${cohort.male * 2}%` }} className="h-2 bg-blue-500 rounded-l-sm"></div>
                </div>
                <div className="w-8 text-center text-stone-500 font-mono">{cohort.label}</div>
                <div className="flex-1 flex justify-start">
                    <div style={{ width: `${cohort.female * 2}%` }} className="h-2 bg-rose-500 rounded-r-sm"></div>
                </div>
            </div>
        ))}
        <div className="flex justify-between text-[9px] text-stone-400 mt-2 px-8">
            <span>Male</span>
            <span>Female</span>
        </div>
    </div>
);
