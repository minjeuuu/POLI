
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { OrganizationDetail } from "../types";

export const fetchOrganizationDetail = async (name: string): Promise<OrganizationDetail | null> => {
    const cacheKey = `org_poli_v2_full_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ENCYCLOPEDIC ARCHIVE — INTERNATIONAL ORGANIZATION DOSSIER: ${name}
CLASSIFICATION: COMPREHENSIVE INSTITUTIONAL PROFILE
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. COMPLETE MEMBER ROSTER: List EVERY SINGLE member state or entity. For the UN: all 193 members plus observers. For NATO: all members with accession year. For the EU: all members with accession year. For the AU: all 55 members. For ASEAN: all 10. For any org: list EVERY member with ISO 3166-1 alpha-2 code. DO NOT abbreviate.
2. HISTORY: Minimum 700 words. Cover founding circumstances, founding treaty/summit, founding members, evolution over decades, landmark decisions, crises, expansions, and current relevance.
3. MISSION: Minimum 150 words describing the organization's purpose, mandate, core values, and operational scope.
4. GOVERNANCE: Describe decision-making in detail — voting rules, veto powers, budget approval, membership admission/suspension rules.
5. KEY ORGANS: List ALL major bodies with full name, function, composition, meeting frequency, and decision-making power.
6. LEADERSHIP: Full biography of current head plus predecessors for past 20 years.
7. FINANCES: Total budget, how funded (assessed contributions), largest donors, budget by program area, controversies.
8. PROJECTS: List ALL active major programs/missions with name, objective, region, budget, start year, and current status.
9. TREATIES: List ALL major treaties, conventions, and protocols adopted under the organization's auspices with year and significance.
10. CONTROVERSIES: All major criticisms, corruption allegations, failed missions, reform demands — full context for each.
11. SATELLITE OFFICES: ALL field offices, regional bureaus, specialized agency HQ with cities and functions.
12. LEGAL FRAMEWORK: Founding charter/treaty, key provisions, amendment history, international legal status.

RETURN VALID JSON ONLY:
{
    "name": "Official full name",
    "abbr": "Acronym",
    "type": "IGO / NGO / Military Alliance / Economic Bloc / etc.",
    "headquarters": "City, Country",
    "founded": "Full founding date or year",
    "foundingTreaty": "Founding charter name and date",
    "secretaryGeneral": "Full name and title of current head",
    "mission": "MINIMUM 150 WORDS — comprehensive mission and mandate",
    "members": [
        { "name": "Member full name", "role": "Member / Observer / Founding Member", "isoCode": "XX", "joinYear": "YYYY" }
    ],
    "history": "MINIMUM 700 WORDS — Complete institutional history with paragraph breaks",
    "keyOrgans": [
        { "name": "Organ name", "function": "Detailed function and powers", "composition": "How members selected", "votingRules": "Voting mechanism" }
    ],
    "majorTreaties": ["Treaty name — Year — Significance"],
    "budget": "Annual budget with year and currency",
    "budgetBreakdown": [{ "area": "Program area", "allocation": "Amount or %" }],
    "ideologicalParadigm": "Underlying philosophy and values",
    "governanceModel": "Detailed decision-making structure, vetoes, voting, accountability",
    "satelliteOffices": ["City, Country — Office type/function"],
    "logoUrl": "Wikimedia URL if highly confident, else empty string",
    "leadership": [
        { "name": "Full name", "role": "Title", "nationality": "Country", "since": "Year", "bio": "Biography paragraph" }
    ],
    "finances": [{ "source": "Funding source", "amount": "Amount or % of budget" }],
    "projects": [
        { "name": "Project name", "description": "Detailed description of objectives and scope", "status": "Active / Completed / Suspended", "budget": "Budget", "region": "Geographic scope", "startYear": "YYYY" }
    ],
    "controversies": ["Complete controversy with date, parties, outcome, and impact"],
    "legalFramework": "Description of founding legal instruments and international legal status"
}
            `;

            const response = await generateWithFallback({ contents: prompt });
            const aiData = safeParse(response.text || '{}', null) as OrganizationDetail | null;
            if (!aiData || !aiData.name) return null;
            return aiData;
        } catch (e) {
            return null;
        }
    });
};
