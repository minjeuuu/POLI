
import React from 'react';

interface DataTableProps {
    headers: string[];
    rows: (string | number)[][];
}

export const DataTable: React.FC<DataTableProps> = ({ headers, rows }) => (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
        <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 dark:bg-stone-900 text-xs uppercase font-bold text-stone-500">
                <tr>
                    {headers.map((h, i) => <th key={i} className="px-6 py-3">{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800">
                        {row.map((cell, j) => <td key={j} className="px-6 py-4 font-mono text-xs text-stone-700 dark:text-stone-300">{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
