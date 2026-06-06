
import React from 'react';
import { User, Briefcase } from 'lucide-react';

export const CabinetRoster: React.FC<{ members: any[], onNavigate: (t:string, p:any)=>void }> = ({ members, onNavigate }) => {
    // Defensive check: Ensure members is actually an array
    const safeMembers = Array.isArray(members) ? members : [];

    return (
        <div className="bg-stone-50 dark:bg-stone-900/30 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Cabinet & Officials</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {safeMembers.map((min, i) => (
                    <div key={i} className="p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-100 dark:border-stone-800 flex items-start gap-3 hover:border-academic-gold transition-colors cursor-pointer group" onClick={() => onNavigate('Person', min.name)}>
                        <div className="mt-1 p-1.5 bg-stone-100 dark:bg-stone-800 rounded text-stone-400 group-hover:bg-academic-gold group-hover:text-white transition-colors"><User className="w-3 h-3" /></div>
                        <div>
                            <span className="text-[9px] font-bold uppercase text-stone-400 block mb-0.5 group-hover:text-academic-accent dark:group-hover:text-indigo-400 transition-colors">{min.role}</span>
                            <span className="text-sm font-bold text-academic-text dark:text-stone-200">{min.name}</span>
                            {min.ministry && <p className="text-[10px] text-stone-400 italic mt-1">{min.ministry}</p>}
                        </div>
                    </div>
                ))}
                {safeMembers.length === 0 && (
                    <div className="col-span-full text-center py-4 text-stone-400 text-xs italic">
                        Roster data currently unavailable.
                    </div>
                )}
            </div>
        </div>
    );
};
