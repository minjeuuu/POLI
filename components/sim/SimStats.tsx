
import React from 'react';
import { Activity, Coins, Shield, Users } from 'lucide-react';
import { SimulationState } from '../../types';

export const SimStats: React.FC<{ stats: SimulationState['stats'] }> = ({ stats }) => (
    <div className="grid grid-cols-4 gap-3 mb-2">
        <StatBox label="Stability" value={stats.stability} icon={Activity} color="emerald" />
        <StatBox label="Wealth" value={stats.wealth} icon={Coins} color="amber" />
        <StatBox label="Military" value={stats.military} icon={Shield} color="rose" />
        <StatBox label="Liberty" value={stats.liberty} icon={Users} color="blue" />
    </div>
);

const StatBox = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 text-center shadow-sm">
        <Icon className={`w-5 h-5 mx-auto mb-1 text-${color}-500`} />
        <span className="text-[9px] font-bold uppercase text-stone-400 block mb-1">{label}</span>
        <span className="text-lg font-bold font-mono text-stone-800 dark:text-white">{value}</span>
    </div>
);
