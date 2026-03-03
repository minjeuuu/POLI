
export const startMeasure = (label: string) => {
    performance.mark(`${label}-start`);
};

export const endMeasure = (label: string) => {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const entries = performance.getEntriesByName(label);
    const duration = entries[entries.length - 1].duration;
    
    // Cleanup
    performance.clearMarks(`${label}-start`);
    performance.clearMarks(`${label}-end`);
    performance.clearMeasures(label);
    
    return duration;
};
