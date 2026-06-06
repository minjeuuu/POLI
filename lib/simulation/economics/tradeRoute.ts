
export interface TradeRoute {
    source: string;
    destination: string;
    commodity: string;
    volume: number;
    efficiency: number;
}

export const calculateTradeValue = (route: TradeRoute, globalPrice: number): number => {
    return route.volume * globalPrice * (route.efficiency / 100);
};
