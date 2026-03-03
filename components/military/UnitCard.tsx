
import React from 'react';
import { Sword, Shield, DollarSign } from 'lucide-react';
import { MilitaryUnit } from '../../services/military/unitDefinitions';

export const UnitCard: React.FC<{ unit: MilitaryUnit }> = ({ unit }) => (
    <div className="bg-stone-800 border border-stone-700 rounded-lg p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <span className="font-bold text-stone-200 text-sm">{unit.name}</span>
            <span className="text-[9px] uppercase bg-stone-700 px-1.5 py-0.5 rounded text-stone-400">{unit.type}</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="flex items-center gap-1 text-rose-400" title="Attack"><Sword className="w-3 h-3" /> {unit.attack}</div>
            <div className="flex items-center gap-1 text-blue-400" title="Defense"><Shield className="w-3 h-3" /> {unit.defense}</div>
            <div className="flex items-center gap-1 text-amber-400" title="Cost"><DollarSign className="w-3 h-3" /> {unit.cost}</div>
        </div>
    </div>
);
