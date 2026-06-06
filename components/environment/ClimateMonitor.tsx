
import React from 'react';
import { Thermometer, CloudRain, Wind } from 'lucide-react';
import { AtomicProgressBar } from '../shared/AtomicProgressBar';

export const ClimateMonitor: React.FC<{ co2: number, temp: number }> = ({ co2, temp }) => (
    <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
        <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
            <Thermometer className="w-4 h-4" /> Planetary Health
        </h4>
        
        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-xs text-stone-300 mb-1">
                    <span>CO2 PPM</span>
                    <span>{co2}</span>
                </div>
                <AtomicProgressBar value={co2} max={1000} color={co2 > 500 ? 'bg-red-500' : 'bg-emerald-500'} />
            </div>
            
            <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                <span className="text-xs text-stone-400">Global Temp Anomaly</span>
                <span className={`font-mono font-bold ${temp > 2 ? 'text-red-500' : 'text-blue-400'}`}>+{temp}°C</span>
            </div>
        </div>
    </div>
);
