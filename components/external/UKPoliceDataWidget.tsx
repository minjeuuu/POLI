import React, { useState, useEffect } from 'react';
import { Shield, ExternalLink } from 'lucide-react';

export const UKPoliceDataWidget: React.FC = () => {
    const [forces, setForces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://data.police.uk/api/forces`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        // random selection roughly
                        setForces(data.slice(0, 6)); 
                    }
                }
            } catch (e) {
                console.warn("UK Police API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || forces.length === 0) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> UK Constabularies & Policing
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {forces.map((force, idx) => (
                    <div 
                        key={idx}
                        className="p-3 flex flex-col justify-center items-center text-center rounded-lg bg-white dark:bg-stone-950 border border-slate-200 dark:border-slate-800"
                    >
                        <h4 className="font-serif font-bold text-xs text-stone-800 dark:text-stone-200 leading-tight">{force.name}</h4>
                        <span className="text-[9px] font-mono text-stone-500 mt-2">{force.id}</span>
                    </div>
                ))}
            </div>
            <a href="https://data.police.uk/" target="_blank" rel="noopener noreferrer" className="block mt-4 text-[10px] uppercase font-bold text-slate-600 hover:underline">
                Open Police Data <ExternalLink className="w-3 h-3 inline mb-0.5" />
            </a>
        </div>
    );
};
