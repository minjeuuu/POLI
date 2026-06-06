
import React, { useState } from 'react';
import { GameEntity, EntityType } from '../../../types/gameTypes';
import { Search, Filter } from 'lucide-react';
import { IconRenderer } from '../../IconMap';

interface InventoryRailProps {
    entities: GameEntity[];
    filterType: EntityType | null;
    onSelect: (entity: GameEntity) => void;
}

export const InventoryRail: React.FC<InventoryRailProps> = ({ entities, filterType, onSelect }) => {
    const [search, setSearch] = useState('');

    const filtered = entities.filter(e => 
        (filterType ? e.type === filterType : true) &&
        (e.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="h-full flex flex-col bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 w-80 shadow-xl z-20">
            <div className="p-4 border-b border-stone-200 dark:border-stone-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Component Library</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input 
                        type="text" 
                        placeholder={filterType ? `Search ${filterType}s...` : "Search components..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-academic-accent dark:focus:ring-indigo-500 text-stone-800 dark:text-stone-200"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {filtered.map(entity => (
                    <button 
                        key={entity.id}
                        onClick={() => onSelect(entity)}
                        className="w-full p-3 bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-left transition-all group flex items-start gap-3 active:scale-[0.98]"
                    >
                        <div className="p-2 bg-white dark:bg-stone-900 rounded-lg border border-stone-100 dark:border-stone-800 text-stone-400 group-hover:text-academic-accent dark:group-hover:text-indigo-400 transition-colors">
                            <IconRenderer name={entity.type === 'Country' ? 'Flag' : entity.type === 'Person' ? 'User' : 'Book'} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold text-sm text-stone-800 dark:text-stone-200 truncate">{entity.name}</h4>
                            <p className="text-[10px] text-stone-500 truncate">{entity.description}</p>
                            <div className="flex gap-1 mt-1.5">
                                {entity.tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="text-[9px] bg-stone-200 dark:bg-stone-700 px-1.5 rounded text-stone-600 dark:text-stone-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
