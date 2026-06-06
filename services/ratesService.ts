
import { generateWithRetry, cleanJson, withCache } from "./common";
import { ExchangeRate } from "../types";
import { CURRENCY_DATA } from "../data/currencyData";

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    return withCache(`rates_v5_${new Date().getHours()}`, async () => { 
        let webRates: ExchangeRate[] = [];
        try {
            // Fiat from Frankfurter
            const frankRes = await fetch('https://api.frankfurter.app/latest?from=USD');
            if (frankRes.ok) {
                const frankData = await frankRes.json();
                for (const [code, rate] of Object.entries(frankData.rates)) {
                    webRates.push({
                        currencyCode: code.toUpperCase(),
                        currencyName: code.toUpperCase() + ' Fiat',
                        rate: Number(rate),
                        symbol: code.toUpperCase(),
                        category: 'Fiat'
                    });
                }
                webRates.push({ currencyCode: 'USD', currencyName: 'US Dollar', rate: 1, symbol: '$', category: 'Fiat' });
            }
        } catch (e) { console.warn("Frankfurter failed"); }

        try {
            // Crypto from CoinGecko
            const cgRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,solana,cardano,ripple,polkadot,dogecoin&vs_currencies=usd');
            if (cgRes.ok) {
                const cgData = await cgRes.json();
                if (cgData.bitcoin) webRates.push({ currencyCode: 'BTC', currencyName: 'Bitcoin', rate: cgData.bitcoin.usd > 0 ? 1 / cgData.bitcoin.usd : 0.00001, symbol: '₿', category: 'Crypto' });
                if (cgData.ethereum) webRates.push({ currencyCode: 'ETH', currencyName: 'Ethereum', rate: cgData.ethereum.usd > 0 ? 1 / cgData.ethereum.usd : 0.0003, symbol: 'Ξ', category: 'Crypto' });
                if (cgData.solana) webRates.push({ currencyCode: 'SOL', currencyName: 'Solana', rate: cgData.solana.usd > 0 ? 1 / cgData.solana.usd : 0.005, symbol: '◎', category: 'Crypto' });
                if (cgData.tether) webRates.push({ currencyCode: 'USDT', currencyName: 'Tether', rate: cgData.tether.usd > 0 ? 1 / cgData.tether.usd : 1, symbol: '₮', category: 'Crypto' });
                if (cgData.cardano) webRates.push({ currencyCode: 'ADA', currencyName: 'Cardano', rate: cgData.cardano.usd > 0 ? 1 / cgData.cardano.usd : 1, symbol: '₳', category: 'Crypto' });
            }
        } catch (e) { console.warn("CoinGecko failed"); }

         try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Generate a JSON array of major exchange rates relative to USD.
                JSON: [{currencyCode: string, currencyName: string, rate: number, symbol: string, category: 'Fiat' | 'Crypto' | 'Historical' | 'Fictional'}].
                Include major fiat, top 5 crypto, and 2 historical (e.g., Roman Denarius), 2 fictional.`,
                config: { responseMimeType: "application/json" }
            });
            const geminiRates = JSON.parse(cleanJson(response.text || '[]')) as ExchangeRate[];
            
            // Merge, preferring CURRENCY_DATA, then webRates, then Gemini
            const rateMap = new Map<string, ExchangeRate>();
            
            geminiRates.forEach(r => rateMap.set(r.currencyCode.toUpperCase(), {...r, currencyCode: r.currencyCode.toUpperCase()}));
            webRates.forEach(r => rateMap.set(r.currencyCode.toUpperCase(), {...r, currencyCode: r.currencyCode.toUpperCase()}));
            CURRENCY_DATA.forEach(r => rateMap.set(r.currencyCode.toUpperCase(), {...r, currencyCode: r.currencyCode.toUpperCase()}));
            
            return Array.from(rateMap.values());
        } catch (e) { 
            const rateMap = new Map<string, ExchangeRate>();
            webRates.forEach(r => rateMap.set(r.currencyCode.toUpperCase(), {...r, currencyCode: r.currencyCode.toUpperCase()}));
            CURRENCY_DATA.forEach(r => rateMap.set(r.currencyCode.toUpperCase(), {...r, currencyCode: r.currencyCode.toUpperCase()}));
            return Array.from(rateMap.values());
        }
    });
};

export const fetchCurrencyAnalysis = async (currency: string): Promise<{history: string, economics: string}> => {
    return withCache(`currency_analysis_pro_v2_${currency}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-pro-preview',
                contents: `Analyze currency: ${currency}. Provide detailed history and economic profile in political science context. JSON: {history: string, economics: string}.`,
                config: { responseMimeType: "application/json" }
            });
            return JSON.parse(cleanJson(response.text || '{}'));
        } catch (e) { return { history: "Unavailable", economics: "Unavailable" }; }
    });
};

