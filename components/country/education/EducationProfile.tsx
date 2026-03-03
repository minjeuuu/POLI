
import React from 'react';
import { GraduationCap, BookOpen, School, DollarSign } from 'lucide-react';

export const EducationProfile = ({ data }: { data: any }) => {
    if (!data) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full"><BookOpen className="w-6 h-6" /></div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Literacy Rate</div>
                    <div className="text-2xl font-bold text-stone-800 dark:text-stone-100">{data.literacyRate || "N/A"}</div>
                </div>
            </div>
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-full"><School className="w-6 h-6" /></div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-400">System Structure</div>
                    <div className="text-lg font-bold text-stone-800 dark:text-stone-100">{data.system || "N/A"}</div>
                </div>
            </div>
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 md:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Top Universities</h4>
                <ul className="space-y-2">
                    {data.universities?.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
             <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 md:col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-stone-600 dark:text-stone-300">Education Expenditure</span>
                </div>
                <div className="font-mono text-lg font-bold text-stone-800 dark:text-stone-100">{data.expenditure || "N/A"}</div>
            </div>
        </div>
    );
};
