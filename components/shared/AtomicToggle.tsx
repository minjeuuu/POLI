
import React from 'react';

interface AtomicToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const AtomicToggle: React.FC<AtomicToggleProps> = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center cursor-pointer group">
            <div className="relative">
                <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={checked} 
                    onChange={(e) => onChange(e.target.checked)} 
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-academic-accent dark:bg-indigo-600' : 'bg-stone-300 dark:bg-stone-700'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
            <span className="ml-3 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                {label}
            </span>
        </label>
    );
};
