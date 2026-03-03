
import React, { useState } from 'react';
import { CountryMapData } from '../../../types';

const MapImageWithFallback: React.FC<{ src: string; alt: string; title: string; type: string }> = ({ src, alt, title, type }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [errored, setErrored] = useState(false);

    const handleError = () => {
        if (!errored) {
            setErrored(true);
            const seed = alt.replace(/\s+/g, '-').toLowerCase();
            setImgSrc(`https://picsum.photos/seed/${seed}/800/450`);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={handleError}
            referrerPolicy="no-referrer"
        />
    );
};

export const InteractiveMapGallery: React.FC<{ maps: CountryMapData[] }> = ({ maps }) => {
    if (!maps || maps.length === 0) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {maps.map((map, i) => (
                <div key={i} className="group relative aspect-video bg-stone-100 dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm cursor-pointer">
                    <MapImageWithFallback
                        src={map.imageUrl}
                        alt={map.title}
                        title={map.title}
                        type={map.type}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-academic-gold mb-1">{map.type} Map</span>
                        <h4 className="text-white font-serif font-bold">{map.title}</h4>
                        {map.source && <span className="text-[8px] text-stone-400 mt-1">{map.source}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};
