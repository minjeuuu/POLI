import React, { useState, useEffect } from 'react';
import { Megaphone, ExternalLink } from 'lucide-react';

export const UKPetitionsWidget: React.FC = () => {
    const [petitions, setPetitions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get most signed open petitions
                const res = await fetch(`https://petition.parliament.uk/petitions.json?state=open`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.data && data.data.length > 0) {
                        const sorted = data.data.sort((a: any, b: any) => b.attributes.signature_count - a.attributes.signature_count);
                        setPetitions(sorted.slice(0, 4));
                    }
                }
            } catch (e) {
                console.warn("UK Petitions API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || petitions.length === 0) return null;

    return (
        <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#006053] dark:text-[#5fd4c6] mb-4 flex items-center gap-2">
                <Megaphone className="w-4 h-4" /> Civic Engagement (Parliament Petitions)
            </h3>
            <div className="space-y-4">
                {petitions.map((pet, idx) => (
                    <a 
                        key={idx}
                        href={`https://petition.parliament.uk/petitions/${pet.id}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="group flex flex-col p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:border-[#006053] transition-colors"
                    >
                        <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-2 leading-tight">{pet.attributes.action}</h4>
                        <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden mb-1">
                             {/* naive progress bar, assuming 100k is the goal for debate */}
                             <div className="bg-[#006053] h-full" style={{ width: `${Math.min((pet.attributes.signature_count / 100000) * 100, 100)}%` }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-stone-500 mt-1">
                             <span>{pet.attributes.signature_count.toLocaleString()} signatures</span>
                             {pet.attributes.signature_count >= 100000 && <span className="text-[#006053]">Debate threshold met</span>}
                        </div>
                    </a>
                ))}
            </div>
            <p className="text-[9px] uppercase text-stone-500 mt-4 tracking-widest">* Currently open petitions by signature count</p>
        </div>
    );
};
