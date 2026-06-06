
import React from 'react';
import { GameEntity, EntityType } from '../../../types/gameTypes';
import { Plus, X, AlertTriangle } from 'lucide-react';
import { IconRenderer } from '../../IconMap';

interface StructureCanvasProps {
    requiredSlots: EntityType[];
    placedEntities: Record<string, GameEntity>;
    onRemove: (slotId: string) => void;
    onSlotClick: (slotType: EntityType, slotId: string) => void;
    lockedEntities: GameEntity[];
    metrics: any;
}

export const StructureCanvas: React.FC<StructureCanvasProps> = ({ 
    requiredSlots, placedEntities, onRemove, onSlotClick, lockedEntities, metrics 
}) => {
    
    // Combine locked entities into the visual grid if they map to types, 
    // or just display them as fixed nodes.
    
    return (
        <div className="flex-1 bg-stone-100 dark:bg-stone-900/50 rounded-3xl border-2 border-dashed border-stone-300 dark:border-stone-800 p-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {metrics.structuralIntegrity < 50 && (
                <div className="absolute inset-0 border-4 border-red-500/20 animate-pulse pointer-events-none rounded-3xl"></div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {/* LOCKED ENTITIES */}
                {lockedEntities.map((entity, i) => (
                    <div key={`locked_${i}`} className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 border-2 border-academic-gold rounded-2xl p-4 flex flex-col justify-between opacity-80 cursor-not-allowed relative">
                        <div className="absolute top-2 right-2 text-academic-gold text-[9px] font-bold uppercase tracking-widest bg-black/10 px-2 py-1 rounded">Locked</div>
                        <div className="p-3 bg-academic-gold/10 rounded-full w-fit">
                            <IconRenderer name="Lock" className="w-6 h-6 text-academic-gold" />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-stone-700 dark:text-stone-200 text-lg">{entity.name}</h4>
                            <span className="text-xs uppercase tracking-widest text-stone-500">{entity.type}</span>
                        </div>
                    </div>
                ))}

                {/* SLOTS */}
                {requiredSlots.map((type, i) => {
                    const slotId = `slot_${i}`;
                    const entity = placedEntities[slotId];
                    
                    if (entity) {
                        return (
                            <div key={slotId} className="aspect-[4/3] bg-white dark:bg-stone-800 border-2 border-academic-accent dark:border-indigo-500 rounded-2xl p-4 flex flex-col justify-between shadow-lg relative group animate-in zoom-in-95 duration-300">
                                <button 
                                    onClick={() => onRemove(slotId)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                
                                <div className="p-3 bg-academic-accent/10 dark:bg-indigo-500/20 rounded-full w-fit">
                                    <IconRenderer name={entity.type === 'Country' ? 'Flag' : entity.type === 'Person' ? 'User' : 'BookOpen'} className="w-6 h-6 text-academic-accent dark:text-indigo-400" />
                                </div>
                                
                                <div>
                                    <h4 className="font-serif font-bold text-academic-text dark:text-white text-lg line-clamp-2">{entity.name}</h4>
                                    <div className="flex justify-between items-end mt-1">
                                        <span className="text-xs uppercase tracking-widest text-stone-500">{entity.subtype || entity.type}</span>
                                        <div className="flex gap-1">
                                            {/* Mini stat viz */}
                                            <div className="w-1 h-3 bg-stone-300 dark:bg-stone-600 rounded-full overflow-hidden">
                                                <div className="bg-red-500 w-full" style={{ height: `${entity.stats.authority}%` }}></div>
                                            </div>
                                            <div className="w-1 h-3 bg-stone-300 dark:bg-stone-600 rounded-full overflow-hidden">
                                                <div className="bg-green-500 w-full" style={{ height: `${entity.stats.economy}%` }}></div>
                                            </div>
                                            <div className="w-1 h-3 bg-stone-300 dark:bg-stone-600 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 w-full" style={{ height: `${entity.stats.tradition}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <button 
                            key={slotId}
                            onClick={() => onSlotClick(type, slotId)}
                            className="aspect-[4/3] border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-stone-200 dark:hover:bg-stone-800/50 transition-colors text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-300 group"
                        >
                            <div className="p-4 bg-stone-200 dark:bg-stone-800 rounded-full group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-bold uppercase tracking-widest text-xs">Add {type}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
