
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flag } from 'lucide-react';
import { CountryDeepDive } from '../../../types';
import { getFlagUrls, generateProceduralFlag } from '../../../utils/countryFlags';

interface FlagImageProps {
    imageUrl?: string;
    alpha2?: string;
    countryName: string;
}

const FlagImage: React.FC<FlagImageProps> = ({ imageUrl, alpha2, countryName }) => {
    const [stage, setStage] = useState(0);

    // Build comprehensive fallback chain — always ends with a procedural flag
    const sources: string[] = [];
    if (imageUrl) sources.push(imageUrl);
    const flagUrls = getFlagUrls(countryName);
    flagUrls.forEach(u => { if (!sources.includes(u)) sources.push(u); });
    if (alpha2) {
        const a2 = alpha2.toLowerCase();
        const extra = [
            `https://flagcdn.com/w320/${a2}.png`,
            `https://hatscripts.github.io/circle-flags/flags/${a2}.svg`,
            `https://flagsapi.com/${a2.toUpperCase()}/flat/64.png`,
        ];
        extra.forEach(u => { if (!sources.includes(u)) sources.push(u); });
    }
    // Procedural flag as ultimate fallback — always renders
    sources.push(generateProceduralFlag(countryName));

    useEffect(() => { setStage(0); }, [imageUrl, alpha2, countryName]);

    const currentSrc = sources[stage] || sources[sources.length - 1];

    const handleError = () => {
        if (stage + 1 < sources.length) {
            setStage(s => s + 1);
        }
    };

    return (
        <img
            src={currentSrc}
            className="w-full h-full object-cover"
            alt={`Flag of ${countryName}`}
            onError={handleError}
            referrerPolicy="no-referrer"
        />
    );
};

interface CountryHeroProps {
    data: CountryDeepDive;
    onBack: () => void;
}

export const CountryHero: React.FC<CountryHeroProps> = ({ data, onBack }) => (
    <div className="relative h-80 w-full overflow-hidden bg-stone-900 group">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academic-bg dark:from-stone-950 via-transparent to-transparent"></div>

        {data.imageArchive && data.imageArchive.length > 0 && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                    src={data.imageArchive[0].url}
                    className="w-full h-full object-cover grayscale"
                    alt="Background"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 z-10">
            <div className="flex items-end gap-6">
                <div className="w-32 h-20 bg-stone-800 rounded-lg shadow-2xl border-2 border-white dark:border-stone-700 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                    <FlagImage
                        imageUrl={data.identity.flag?.imageUrl}
                        alpha2={data.identity.isoCodes?.alpha2}
                        countryName={data.identity.commonName}
                    />
                </div>
                <div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-academic-text dark:text-stone-100 leading-none mb-2 drop-shadow-sm tracking-tight">{data.identity.commonName}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400">
                        <span>{data.identity.officialName}</span>
                        <span className="w-1 h-1 bg-academic-gold rounded-full"></span>
                        <span>{data.identity.isoCodes?.alpha3}</span>
                        <span className="w-1 h-1 bg-academic-gold rounded-full"></span>
                        <span>{data.government.form}</span>
                    </div>
                </div>
            </div>
        </div>

        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors z-50">
            <ArrowLeft className="w-6 h-6" />
        </button>
    </div>
);
