import React, { useState } from 'react';
import { Flag } from 'lucide-react';

interface CountryFlagProps {
    countryName: string;
    className?: string;
    iconSize?: string;
    alt?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ 
    countryName, 
    className = "", 
    iconSize = "w-8 h-8",
    alt = "Flag" 
}) => {
    const [imgError, setImgError] = useState(false);
    const [fallbackAttempt, setFallbackAttempt] = useState(0);

    // Try multiple formats for wikipedia commons files
    const getFlagUrl = () => {
        const baseName = encodeURIComponent(countryName.replace(/ /g, '_'));
        if (fallbackAttempt === 0) {
            // Standard wikipedia SVG
            return `https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_${baseName}.svg`;
        } else if (fallbackAttempt === 1) {
            // Wikipedia SVG with "the"
            return `https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_the_${baseName}.svg`;
        } else if (fallbackAttempt === 2) {
             // Standard wikipedia PNG
            return `https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_${baseName}.png`;
        } else if (fallbackAttempt === 3) {
             // Ultimate fallback: Web Search Thumbnail (Bing Image Search hack) to get ANY flag (fictional, historical, micronation)
             return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(countryName + " national flag vector official clear")}&w=400&h=300&c=7&pid=Api`;
        }
        return null;
    };

    const url = getFlagUrl();

    if (imgError || !url) {
        return (
            <div className={`flex items-center justify-center bg-stone-100 dark:bg-stone-800 ${className}`}>
                <Flag className={`${iconSize} text-stone-300 dark:text-stone-600 opacity-80`} />
            </div>
        );
    }

    return (
        <img 
            src={url} 
            alt={alt}
            className={`object-cover w-full h-full ${className}`}
            onError={() => {
                if (fallbackAttempt < 3) {
                    setFallbackAttempt(prev => prev + 1);
                } else {
                    setImgError(true);
                }
            }}
        />
    );
};
