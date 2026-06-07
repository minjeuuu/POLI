import React, { useState, useEffect } from 'react';
import { Landmark, ExternalLink } from 'lucide-react';

interface UKParliamentWidgetProps {
    queryText: string;
}

export const UKParliamentWidget: React.FC<UKParliamentWidgetProps> = ({ queryText }) => {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Only take first word to avoid over-constrained search
                const query = queryText.split(' ')[0];
                const res = await fetch(`https://members-api.parliament.uk/api/Members/Search?Name=${encodeURIComponent(query)}&skip=0&take=5`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.items && data.items.length > 0) {
                        setMembers(data.items);
                    }
                }
            } catch (e) {
                console.warn("UK Parliament API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryText]);

    if (loading || members.length === 0) return null;

    return (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500 mb-4 flex items-center gap-2">
                <Landmark className="w-4 h-4" /> UK Parliament Members (Lords & Commons)
            </h3>
            <div className="space-y-3">
                {members.map((item, idx) => {
                    const member = item.value;
                    return (
                        <a 
                            key={idx}
                            href={`https://members.parliament.uk/member/${member.id}/contact`}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="block p-3 rounded-lg bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-900/40 hover:border-emerald-400 transition-colors"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200">{member.nameDisplayAs}</h4>
                                    <p className="text-[10px] uppercase font-bold text-stone-500 mt-1">
                                        {member.latestParty?.name} {member.latestHouseMembership?.membershipFrom && `• ${member.latestHouseMembership.membershipFrom}`}
                                    </p>
                                </div>
                                <img 
                                    src={member.thumbnailUrl} 
                                    alt={member.nameDisplayAs} 
                                    className="w-10 h-10 rounded-full object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                                    onError={(e: any) => e.target.style.display = 'none'}
                                />
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    );
};
