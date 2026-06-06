
import { useEffect, useState } from 'react';

export const useThemeDetector = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const themeChangeHandler = (e: MediaQueryListEvent) => {
            setIsDarkTheme(e.matches);
        };
        mq.addEventListener("change", themeChangeHandler);
        return () => mq.removeEventListener("change", themeChangeHandler);
    }, []);

    return isDarkTheme;
};
