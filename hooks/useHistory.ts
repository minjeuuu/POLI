
import { useState } from 'react';

export function useHistory<T>(initialState: T) {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState<T[]>([initialState]);

    const setState = (action: T | ((prev: T) => T)) => {
        const newState = typeof action === 'function' ? (action as Function)(history[index]) : action;
        const newHistory = history.slice(0, index + 1);
        newHistory.push(newState);
        setHistory(newHistory);
        setIndex(newHistory.length - 1);
    };

    const undo = () => index > 0 && setIndex(i => i - 1);
    const redo = () => index < history.length - 1 && setIndex(i => i + 1);

    return [history[index], setState, undo, redo, index > 0, index < history.length - 1] as const;
}
