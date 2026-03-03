
export const TRANSITIONS = {
    DEFAULT: 'all 0.3s ease-in-out',
    FAST: 'all 0.15s ease-out',
    SLOW: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

export const KEYFRAMES = {
    FADE_IN: { opacity: [0, 1] },
    SLIDE_UP: { transform: ['translateY(20px)', 'translateY(0)'], opacity: [0, 1] }
};
