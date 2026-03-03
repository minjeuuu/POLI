
import React from 'react';
import { Truck, Zap, Wifi, Droplets } from 'lucide-react';
import { InfrastructureProfile } from '../../../types';
import { DetailCard } from '../shared/DetailCard';

export const InfrastructureGrid: React.FC<{ data: InfrastructureProfile }> = ({ data }) => {
    if (!data) return null;
    return (
        <div className="space-y-8">
            {/* Transport */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Truck className="w-4 h-4" /> Transport Network</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DetailCard label="Road Network" value={data.transport?.roadNetwork?.total || "N/A"} icon={Truck} subValue={data.transport?.roadNetwork?.paved + " Paved"} />
                    <DetailCard label="Rail Network" value={data.transport?.railNetwork?.total || "N/A"} icon={Truck} subValue={data.transport?.railNetwork?.highSpeed ? "High Speed" : "Standard"} />
                    <DetailCard label="Airports" value={data.transport?.airports?.total || "N/A"} icon={Truck} subValue={data.transport?.airports?.international?.length + " Int'l"} />
                    <DetailCard label="Major Ports" value={data.transport?.ports?.total || "N/A"} icon={Truck} subValue={data.transport?.ports?.majorTerminals?.join(', ')} />
                </div>
            </div>

            {/* Energy */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Zap className="w-4 h-4" /> Energy Matrix</h4>
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                        {data.energy?.energyMix?.map((mix, i) => (
                            <div key={i} className="flex-1 min-w-[100px] p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-100 dark:border-stone-700">
                                <span className="block text-[10px] font-bold uppercase text-stone-400">{mix.source}</span>
                                <span className="text-lg font-bold text-academic-accent dark:text-indigo-400">{mix.percentage}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-mono text-stone-500">Total Production: {data.energy?.totalProduction}</p>
                </div>
            </div>
            
            {/* Digital & Water */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Wifi className="w-4 h-4" /> Digital Infrastructure</h4>
                     <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3">
                         <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                             <span className="text-sm font-serif">Internet Penetration</span>
                             <span className="font-bold text-academic-gold">{data.digital?.internetPenetration}</span>
                         </div>
                         <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                             <span className="text-sm font-serif">Broadband Speed</span>
                             <span className="font-bold text-academic-gold">{data.digital?.broadbandSpeed}</span>
                         </div>
                         <div className="flex justify-between">
                             <span className="text-sm font-serif">Cyber Security Rank</span>
                             <span className="font-bold text-academic-gold">{data.digital?.cyberSecurityRank}</span>
                         </div>
                     </div>
                </div>
                <div>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Droplets className="w-4 h-4" /> Water & Sanitation</h4>
                     <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3">
                         <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                             <span className="text-sm font-serif">Clean Water Access</span>
                             <span className="font-bold text-blue-500">{data.water?.accessCleanWater}</span>
                         </div>
                         <div className="flex justify-between">
                             <span className="text-sm font-serif">Sanitation Access</span>
                             <span className="font-bold text-blue-500">{data.water?.sanitationAccess}</span>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
