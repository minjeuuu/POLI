
import React from 'react';
import { Cpu, Lock, Check } from 'lucide-react';
import { TECH_TREE } from '../../data/sim/technologies';
import { AtomicButton } from '../shared/AtomicButton';

interface SimTechTreeProps {
    unlocked: string[]; // Array of tech IDs
    wealth: number;
    onResearch: (id: string) => void;
}

export const SimTechTree: React.FC<SimTechTreeProps> = ({ unlocked = [], wealth, onResearch }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Research & Development
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TECH_TREE.map(tech => {
                    const isUnlocked = unlocked.includes(tech.id);
                    const canAfford = wealth >= tech.cost;
                    const hasPrereq = !tech.prereq || unlocked.includes(tech.prereq);
                    const isResearchable = !isUnlocked && canAfford && hasPrereq;

                    return (
                        <div 
                            key={tech.id} 
                            className={`p-4 border rounded-xl flex flex-col justify-between transition-all
                            ${isUnlocked ? 'bg-emerald-900/20 border-emerald-500/30' : 
                              isResearchable ? 'bg-stone-800 border-stone-600' : 'bg-stone-900/50 border-stone-800 opacity-60'}`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className={`font-bold text-sm ${isUnlocked ? 'text-emerald-400' : 'text-stone-200'}`}>{tech.name}</h4>
                                    {isUnlocked ? <Check className="w-4 h-4 text-emerald-500" /> : <Lock className="w-3 h-3 text-stone-500" />}
                                </div>
                                <p className="text-xs text-stone-400 mb-2 h-8 leading-tight">{tech.description}</p>
                                <span className="text-[10px] font-mono text-academic-gold uppercase">{tech.effect}</span>
                            </div>
                            
                            {!isUnlocked && (
                                <button
                                    onClick={() => onResearch(tech.id)}
                                    disabled={!isResearchable}
                                    className={`mt-3 w-full py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-colors
                                    ${isResearchable ? 'bg-academic-accent hover:bg-indigo-500 text-white' : 'bg-stone-800 text-stone-500 cursor-not-allowed'}`}
                                >
                                    Research ({tech.cost})
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
