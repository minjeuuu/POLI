
import { randomRange } from "../../utils/mathUtils";

export interface Stock {
    symbol: string;
    price: number;
    change: number;
    volatility: number;
}

export const generateMarketTick = (stocks: Stock[]): Stock[] => {
    return stocks.map(stock => {
        const changePercent = (Math.random() - 0.5) * stock.volatility;
        const newPrice = Math.max(0.01, stock.price * (1 + changePercent));
        return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat((newPrice - stock.price).toFixed(2))
        };
    });
};

export const INITIAL_MARKET: Stock[] = [
    { symbol: "TECH", price: 150.00, change: 0, volatility: 0.05 },
    { symbol: "AGRI", price: 45.50, change: 0, volatility: 0.02 },
    { symbol: "ARMS", price: 320.10, change: 0, volatility: 0.08 },
    { symbol: "NRG", price: 88.25, change: 0, volatility: 0.03 }
];
