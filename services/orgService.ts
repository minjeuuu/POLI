
import { generateWithFallback, safeParse, withCache, getLanguageInstruction, deepMerge } from "./common";
import { OrganizationDetail } from "../types";

const FALLBACK_ORG: OrganizationDetail = {
    name: "Organization",
    type: "Organization",
    headquarters: "Unknown",
    founded: "Unknown",
    secretaryGeneral: "Unknown",
    mission: "Information currently unavailable.",
    members: [],
    history: "Historical data unavailable.",
    keyOrgans: [],
    majorTreaties: [],
    satelliteOffices: []
};

export const fetchOrganizationDetail = async (name: string): Promise<OrganizationDetail> => {
    const cacheKey = `org_poli_v1_search_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        let wikiImage = "";
        try {
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&utf8=&format=json&origin=*`);
            const searchData = await searchRes.json();
            if (searchData.query?.search?.length > 0) {
                const pageTitle = searchData.query.search[0].title;
                const extractRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`);
                const extractData = await extractRes.json();
                if (extractData.thumbnail?.source) wikiImage = extractData.thumbnail.source;
            }
        } catch (e) { console.warn("Wiki fetch failed"); }

        try {
            const prompt = `
            SYSTEM OVERRIDE: POLI ARCHIVE V1 (LIVE WEB INTELLIGENCE).
            ORGANIZATION: ${name}.
            
            ${getLanguageInstruction()}

            **DIRECTIVES:**
            1. **USE GOOGLE SEARCH**: Ensure the Secretary General/Leader is CURRENT. Ensure the member list is UP TO DATE.
            2. **ROSTER INTEGRITY**: List **ALL** members.
               - If it is the United Nations, list all 193 member states.
               - If it is NATO, list all member states.
               - **DO NOT** summarize.
            3. **DETAILS**:
               - ISO Code: The 2-letter ISO 3166-1 alpha-2 code (e.g., US, FR, JP) to generate flags.
            4. **LEADERSHIP**: Detailed bios of current top leadership.
            5. **FINANCES**: Breakdown of funding sources and major expenditures.
            6. **PROJECTS**: List of current major initiatives and missions.
            7. **CONTROVERSIES**: Major criticisms and scandals.

            RETURN JSON ONLY:
            {
                "name": "Full Name",
                "abbr": "Acronym",
                "type": "IGO/NGO",
                "headquarters": "City, Country",
                "founded": "Date",
                "secretaryGeneral": "Current Leader",
                "mission": "Mission Statement",
                "members": [
                    { "name": "Country A", "role": "Member", "isoCode": "AA" },
                    { "name": "Country B", "role": "Member", "isoCode": "BB" }
                    // ... LIST EVERY SINGLE ONE
                ],
                "history": "Detailed history...",
                "keyOrgans": [{ "name": "Body Name", "function": "Purpose" }],
                "majorTreaties": ["Treaty Name"],
                "budget": "Annual Budget",
                "ideologicalParadigm": "Underlying Philosophy",
                "governanceModel": "Decision Making Structure",
                "satelliteOffices": ["City 1", "City 2"],
                "logoUrl": "Wikimedia URL if available",
                "leadership": [{ "name": "Name", "role": "Role", "bio": "Bio" }],
                "finances": [{ "source": "Source", "amount": "Amount" }],
                "projects": [{ "name": "Project Name", "description": "Description", "status": "Status" }],
                "controversies": ["Controversy 1"]
            }
            `;

            const response = await generateWithFallback({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: { 
                    
                    maxOutputTokens: 8192,
                    tools: [{googleSearch: {}}] 
                }
            });
            const aiData = safeParse(response.text || '{}', {}) as OrganizationDetail;
            const merged = deepMerge(FALLBACK_ORG, aiData);
            if (wikiImage && (!merged.logoUrl || !merged.logoUrl.startsWith("http"))) {
                merged.logoUrl = wikiImage;
            }
            return { ...merged, name }; 
        } catch (e) { return { ...FALLBACK_ORG, name, logoUrl: wikiImage || FALLBACK_ORG.logoUrl }; }
    });
};
