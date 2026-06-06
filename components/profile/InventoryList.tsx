
import React, { useState } from 'react';
import { SavedItem } from '../../types';
import { Search, Trash2, Bookmark, MoreHorizontal, Archive, Filter } from 'lucide-react';

interface InventoryListProps {
    items: SavedItem[];
    onNavigate: (type: string, payload: any) => void;
    onDelete: (id: string) => void;
}

export const InventoryList: React.FC<InventoryListProps> = ({ items, onNavigate, onDelete }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    
    const types = ['All', ...Array.from(new Set(items.map(i => i.type)))];

    const filtered = items.filter(i => 
        (filter === 'All' || i.type === filter) &&
        (i.title.toLowerCase().includes(search.toLowerCase()) || i.subtitle?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm min-h-[400px]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" /> Saved Archives ({items.length})
                </h3>
                
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Search inventory..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg text-sm focus:border-academic-accent outline-none"
                        />
                    </div>
                    <select 
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-bold uppercase tracking-wider outline-none"
                    >
                        {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                    <Archive className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                    <p className="font-serif italic text-stone-400">No items found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3">
                    {filtered.map(item => (
                        <div key={item.id} className="group flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-950/50 rounded-xl border border-transparent hover:border-academic-accent dark:hover:border-indigo-500 transition-all cursor-pointer" onClick={() => onNavigate(item.type, item.title)}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white dark:bg-stone-900 rounded-lg shadow-sm text-academic-gold border border-stone-200 dark:border-stone-800">
                                    <Bookmark className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-bold uppercase text-stone-400 block mb-1">{item.type}</span>
                                    <h4 className="font-bold text-stone-800 dark:text-stone-200 leading-tight">{item.title}</h4>
                                    <p className="text-xs text-stone-500 mt-1">{item.subtitle} • <span className="font-mono">{item.dateAdded}</span></p>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                                className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
