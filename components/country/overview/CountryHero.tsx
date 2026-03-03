
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flag } from 'lucide-react';
import { CountryDeepDive } from '../../../types';

interface FlagImageProps {
    imageUrl?: string;
    alpha2?: string;
    countryName: string;
}

const FlagImage: React.FC<FlagImageProps> = ({ imageUrl, alpha2, countryName }) => {
    const [src, setSrc] = useState<string | null>(null);
    const [stage, setStage] = useState(0);
    const [failed, setFailed] = useState(false);

    const getSrc = (s: number): string | null => {
        if (s === 0 && imageUrl) return imageUrl;
        if (s <= 1 && alpha2) return `https://flagcdn.com/w320/${alpha2.toLowerCase()}.png`;
        if (s <= 2 && alpha2) return `https://hatscripts.github.io/circle-flags/flags/${alpha2.toLowerCase()}.svg`;
        return null;
    };

    useEffect(() => {
        setStage(0);
        setFailed(false);
        const initial = getSrc(0);
        setSrc(initial || (alpha2 ? `https://flagcdn.com/w320/${alpha2.toLowerCase()}.png` : null));
    }, [imageUrl, alpha2]);

    const handleError = () => {
        const nextStage = stage + 1;
        const nextSrc = getSrc(nextStage);
        if (nextSrc) {
            setStage(nextStage);
            setSrc(nextSrc);
        } else {
            setFailed(true);
        }
    };

    if (failed || !src) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-400">
                <Flag className="w-8 h-8" />
            </div>
        );
    }

    return (
        <img
            src={src}
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
