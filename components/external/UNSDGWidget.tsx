import React, { useState, useEffect } from 'react';
import { Globe, ExternalLink } from 'lucide-react';

export const UNSDGWidget: React.FC = () => {
    const [goals, setGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setGoals(data.slice(0, 6)); // First 6 goals
                    }
                }
            } catch (e) {
                console.warn("UN SDG API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || goals.length === 0) return null;

    return (
        <div className="bg-[#e4eff6] dark:bg-[#1a3d54]/20 border border-[#b2d5ea] dark:border-[#1a3d54]/50 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#00609d] dark:text-[#5cb1e9] mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> UN Sustainable Development Goals
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {goals.map((goal, idx) => (
                    <div 
                        key={idx}
                        className="p-3 flex flex-col justify-center items-center text-center rounded-lg bg-white dark:bg-stone-900 border border-[#b2d5ea] dark:border-[#1a3d54] hover:shadow-md transition-shadow"
                    >
                        <span className="text-[10px] font-bold text-[#00609d] mb-1">GOAL {goal.code}</span>
                        <h4 className="font-serif font-bold text-xs text-stone-800 dark:text-stone-200 leading-tight line-clamp-3">{goal.title}</h4>
                    </div>
                ))}
            </div>
            <a href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer" className="block mt-4 text-[10px] uppercase font-bold text-[#00609d] hover:underline">
                View All 17 Goals <ExternalLink className="w-3 h-3 inline mb-0.5" />
            </a>
        </div>
    );
};
