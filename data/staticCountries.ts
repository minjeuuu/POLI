
import { CountryDeepDive } from '../types';

// Performance optimization: Pre-generated deep dives for common countries can be stored here.
// This prevents the AI from needing to generate everything from scratch every time.
export const STATIC_COUNTRIES: Record<string, CountryDeepDive> = {
    // Currently empty, but structured to accept data.
    // As users generate countries, we could theoretically cache them here if we had a backend.
    // For now, it serves as a valid module target to prevent import errors.
};
