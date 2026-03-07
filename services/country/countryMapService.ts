
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryMapData } from "../../types";

// Reliable static map sources that don't require search
const getStaticMapUrls = (countryName: string, alpha2?: string): CountryMapData[] => {
    const slug = encodeURIComponent(countryName.replace(/\s+/g, '_'));
    const a2 = (alpha2 || '').toLowerCase();
    return [
        {
            title: `Political Map of ${countryName}`,
            type: 'Political',
            imageUrl: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/${slug}_in_the_world_%28W3%29.svg/1000px-${slug}_in_the_world_%28W3%29.svg.png`,
            description: `Political overview map showing ${countryName} and its neighbors.`,
            source: 'Wikimedia Commons',
            year: '2024',
        },
        {
            title: `Location Map of ${countryName}`,
            type: 'Physical',
            imageUrl: a2
                ? `https://flagcdn.com/w320/${a2}.png`
                : `https://picsum.photos/seed/${slug}-map/800/450`,
            description: `Geographic location of ${countryName}.`,
            source: 'FlagCDN / Wikimedia',
            year: '2024',
        },
        {
            title: `Regional Map — ${countryName}`,
            type: 'Historical',
            imageUrl: `https://picsum.photos/seed/${slug}-region/800/450`,
            description: `Regional context map for ${countryName}.`,
            source: 'Picsum Photos',
            year: '2024',
        },
    ];
};

export const fetchCountryMaps = async (countryName: string): Promise<CountryMapData[]> => {
    const prompt = `
    Provide map metadata for ${countryName}. Return 4 map entries (Political, Physical, Economic, Historical).

    For each imageUrl, use a real Wikimedia Commons URL you are confident exists, e.g.:
    https://upload.wikimedia.org/wikipedia/commons/[path]/[File.png]

    If uncertain, use: https://picsum.photos/seed/${encodeURIComponent(countryName)}-[maptype]/800/450

    RETURN ONLY VALID JSON ARRAY (no markdown):
    [{ "title": "string", "type": "Political|Physical|Economic|Historical", "imageUrl": "string", "description": "string", "source": "string", "year": "string" }]
    ${getLanguageInstruction()}
    `;

    try {
        const response = await generateWithFallback({ contents: prompt });
        const parsed = safeParse(response.text || '[]', []) as CountryMapData[];
        if (!Array.isArray(parsed) || parsed.length === 0) return getStaticMapUrls(countryName);

        return parsed.map((m, i) => ({
            ...m,
            imageUrl: m.imageUrl && m.imageUrl.startsWith('http')
                ? m.imageUrl
                : `https://picsum.photos/seed/${encodeURIComponent(countryName)}-map${i}/800/450`,
        }));
    } catch {
        return getStaticMapUrls(countryName);
    }
};
