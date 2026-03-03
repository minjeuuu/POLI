
import React from 'react';
import { Heart, Activity, Stethoscope, DollarSign } from 'lucide-react';

export const HealthProfile = ({ data }: { data: any }) => {
    if (!data) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full"><Heart className="w-6 h-6" /></div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Life Expectancy</div>
                    <div className="text-2xl font-bold text-stone-800 dark:text-stone-100">{data.lifeExpectancy || "N/A"}</div>
                </div>
            </div>
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full"><Activity className="w-6 h-6" /></div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-400">System Type</div>
                    <div className="text-lg font-bold text-stone-800 dark:text-stone-100">{data.healthcareSystem || "N/A"}</div>
                </div>
            </div>
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 md:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Major Health Challenges</h4>
                <div className="flex flex-wrap gap-2">
                    {data.majorDiseases?.map((item: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-full text-xs font-bold border border-red-100 dark:border-red-900/20">{item}</span>
                    ))}
                </div>
            </div>
             <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 md:col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-stone-600 dark:text-stone-300">Health Expenditure</span>
                </div>
                <div className="font-mono text-lg font-bold text-stone-800 dark:text-stone-100">{data.expenditure || "N/A"}</div>
            </div>
        </div>
    );
};
