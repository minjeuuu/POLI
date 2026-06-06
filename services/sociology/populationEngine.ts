
import { AGE_COHORTS } from "../../data/sociology/demographics";

export const simulateYearGrowth = (cohorts: typeof AGE_COHORTS, growthRate: number) => {
    return cohorts.map(c => ({
        ...c,
        male: c.male * (1 + growthRate),
        female: c.female * (1 + growthRate)
    }));
};
