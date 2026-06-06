
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { generateMarketTick, INITIAL_MARKET, Stock } from '../../services/economics/marketEngine';

export const StockMarketView: React.FC = () => {
    const [market, setMarket] = useState<Stock[]>(INITIAL_MARKET);

    useEffect(() => {
        const interval = setInterval(() => {
            setMarket(prev => generateMarketTick(prev));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Global Index
            </h4>
            <div className="space-y-2">
                {market.map(stock => (
                    <div key={stock.symbol} className="flex justify-between items-center bg-black/20 p-2 rounded">
                        <span className="font-mono font-bold text-stone-200">{stock.symbol}</span>
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-white">{stock.price.toFixed(2)}</span>
                            <span className={`text-xs flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                {Math.abs(stock.change).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
