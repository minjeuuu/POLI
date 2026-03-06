import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { exportAs, EXPORT_FORMATS, ExportData, ExportFormat } from '../../utils/exportUtils';

interface ExportButtonProps {
    data: ExportData;
    className?: string;
    compact?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data, className = '', compact = false }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleExport = (format: ExportFormat) => {
        exportAs(data, format);
        setOpen(false);
    };

    // Split into two columns
    const half = Math.ceil(EXPORT_FORMATS.length / 2);
    const col1 = EXPORT_FORMATS.slice(0, half);
    const col2 = EXPORT_FORMATS.slice(half);

    return (
        <div ref={ref} className={`relative inline-block ${className}`}>
            <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors min-h-[36px]"
                aria-label="Export"
            >
                <Download size={15} />
                {!compact && <span>Export</span>}
                <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 mt-1 z-50 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-2 min-w-[280px]">
                    <p className="text-xs text-gray-400 px-2 pb-1.5 font-medium uppercase tracking-wider">Download As</p>
                    <div className="flex gap-1">
                        {[col1, col2].map((col, ci) => (
                            <div key={ci} className="flex-1 flex flex-col gap-0.5">
                                {col.map(fmt => (
                                    <button
                                        key={fmt.id}
                                        onClick={() => handleExport(fmt.id)}
                                        className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-gray-700 text-left transition-colors group"
                                    >
                                        <span className="text-sm w-5 text-center shrink-0">{fmt.icon}</span>
                                        <div className="min-w-0">
                                            <div className="text-xs font-medium text-gray-200 group-hover:text-white truncate">{fmt.label}</div>
                                            <div className="text-[10px] text-gray-500">{fmt.ext}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
