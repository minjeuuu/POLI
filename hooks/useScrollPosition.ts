
import React, { useState, useEffect } from 'react';

export const useScrollPosition = (ref: React.RefObject<HTMLElement>) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            setScrollPosition(element.scrollTop);
        };

        element.addEventListener('scroll', handleScroll);
        return () => element.removeEventListener('scroll', handleScroll);
    }, [ref]);

    return scrollPosition;
};
