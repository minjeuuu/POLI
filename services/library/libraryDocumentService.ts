
import { CONSTITUTIONS } from "../../data/legal/constitutions";

export const getAllConstitutions = () => {
    return CONSTITUTIONS;
};

export const getConstitutionByCountry = (country: string) => {
    return CONSTITUTIONS.find(c => c.country === country);
};
