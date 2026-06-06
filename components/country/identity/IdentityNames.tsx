
import React from 'react';

export const IdentityNames: React.FC<{ native: any, demonym: any, motto: any }> = ({ native, demonym, motto }) => (
    <div className="space-y-6">
        <div>
            <span className="block text-xs font-bold text-academic-accent dark:text-indigo-400 mb-1">Native Name</span>
            <span className="font-serif text-2xl text-stone-800 dark:text-stone-100">{native.name}</span>
            <span className="block text-sm text-stone-500 italic">({native.romanization})</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <span className="block text-xs font-bold text-academic-accent dark:text-indigo-400 mb-1">Demonym</span>
                <span className="font-serif text-lg">{demonym.plural}</span>
            </div>
            <div>
                <span className="block text-xs font-bold text-academic-accent dark:text-indigo-400 mb-1">ISO Code</span>
                <span className="font-mono text-lg">See Header</span>
            </div>
        </div>
        <div>
            <span className="block text-xs font-bold text-academic-accent dark:text-indigo-400 mb-1">National Motto</span>
            <span className="font-serif italic text-lg">"{motto.text}"</span>
        </div>
    </div>
);
