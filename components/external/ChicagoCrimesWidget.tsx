import React, { useState, useEffect } from 'react';
import { AlertCircle, MapPin } from 'lucide-react';

export const ChicagoCrimesWidget: React.FC = () => {
    const [crimes, setCrimes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Open data portal for city of chicago
                const res = await fetch(`https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=5&$order=date%20DESC`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setCrimes(data);
                    }
                }
            } catch (e) {
                console.warn("Chicago Open Data API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || crimes.length === 0) return null;

    return (
        <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#41b6e6] dark:text-[#6ccdf6] mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Civic Open Data (Chicago Data Portal)
            </h3>
            <div className="space-y-3">
                {crimes.map((crime, idx) => (
                    <div 
                        key={idx}
                        className="p-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center gap-4 hover:border-[#41b6e6]/50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-stone-500">{crime.fbi_code}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200">{crime.primary_type}</h4>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500 line-clamp-1">{crime.description}</p>
                            <p className="text-[9px] font-mono text-stone-400 mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {crime.block} • {new Date(crime.date).toLocaleDateString()}
                            </p>
                        </div>
                        <span className={`text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${crime.arrest ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-stone-100 text-stone-500 dark:bg-stone-800/50'}`}>
                            {crime.arrest ? 'ARREST' : 'OPEN'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
