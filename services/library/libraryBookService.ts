
import { ANCIENT_BOOKS } from "../../data/library/ancientBooks";
import { MODERN_BOOKS } from "../../data/library/modernBooks";

export const getAllBooks = () => {
    return [...ANCIENT_BOOKS, ...MODERN_BOOKS];
};

export const getBookByEra = (era: 'Ancient' | 'Modern') => {
    return era === 'Ancient' ? ANCIENT_BOOKS : MODERN_BOOKS;
};
