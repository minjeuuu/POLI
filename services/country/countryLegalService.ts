
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchLegalProfile = async (countryName: string) => {
    const prompt = `
    GENERATE AN EXHAUSTIVE LEGAL SYSTEM ENCYCLOPEDIA FOR: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1 (DEEP THOUGHT). MAXIMUM DETAIL. OMIT NOTHING.

    YOU MUST RETURN A COMPLETE JSON OBJECT WITH ALL OF THE FOLLOWING SECTIONS:

    1. "legalSystemType": {
        "classification": "<common law | civil law | religious law | customary law | mixed>",
        "description": "<detailed explanation of the legal tradition and its origins>",
        "influences": ["<list ALL legal traditions that have influenced this system>"],
        "colonialLegacy": "<if applicable, which colonial power shaped the legal system and how>",
        "mixedElements": ["<if mixed system, list each component tradition and what areas of law it governs>"]
    },

    2. "constitution": {
        "name": "<official name of the current constitution>",
        "yearAdopted": <year>,
        "yearEffective": <year it came into force>,
        "preambleSummary": "<detailed summary of the preamble's content and ideals>",
        "totalArticles": <number of articles or sections>,
        "totalChapters": <number of chapters or parts>,
        "amendmentProcess": "<detailed description of how the constitution is amended — supermajorities, referendums, etc.>",
        "numberOfAmendments": <total amendments to date>,
        "keyProvisions": [
            { "article": "<article/section number>", "title": "<title>", "summary": "<what it establishes>" }
        ],
        "historicalConstitutions": [
            { "name": "<name>", "year": <year>, "description": "<what it established and why it was replaced>" }
        ],
        "constitutionalReviewBody": "<name of constitutional court or equivalent body that reviews constitutionality>"
    },

    3. "billOfRights": {
        "officialName": "<name of the bill of rights chapter/document>",
        "fundamentalRights": [
            { "right": "<name of the right>", "article": "<article number>", "description": "<scope and any limitations>", "derogable": <true/false> }
        ],
        "enforcementMechanism": "<how are these rights enforced — courts, ombudsman, commissions>",
        "stateOfEmergencyProvisions": "<what happens to rights during emergencies>"
    },

    4. "legalHierarchy": [
        { "rank": 1, "source": "<e.g. Constitution>", "description": "<supreme law, all other laws must conform>" },
        { "rank": 2, "source": "<e.g. International Treaties>", "description": "<how they rank in domestic law>" },
        { "rank": 3, "source": "<e.g. Statutes/Acts of Parliament>", "description": "" },
        { "rank": 4, "source": "<e.g. Delegated/Subsidiary Legislation>", "description": "" },
        { "rank": 5, "source": "<e.g. Case Law/Judicial Precedent>", "description": "" },
        { "rank": 6, "source": "<e.g. Customary Law>", "description": "" },
        { "rank": 7, "source": "<e.g. Local/Municipal Ordinances>", "description": "" }
    ],

    5. "courtSystem": {
        "structure": "<unitary or federal court system>",
        "courts": [
            {
                "name": "<official name>",
                "level": "<supreme | appellate | trial | specialized | municipal>",
                "jurisdiction": "<what cases it handles>",
                "judges": <number of judges/justices>,
                "chiefJustice": "<current chief justice or presiding judge>",
                "appointmentProcess": "<how judges are appointed>",
                "termLength": "<term length or life tenure>",
                "description": "<role and significance>"
            }
        ],
        "specializedCourts": [
            {
                "name": "<e.g. Tax Court, Military Court, Family Court, Labor Court, Administrative Court, Anti-Corruption Court, Electoral Court, Religious Court>",
                "jurisdiction": "<what it handles>",
                "description": "<details>"
            }
        ],
        "judicialIndependence": "<assessment of judicial independence — de jure and de facto>",
        "judicialReviewProcess": "<how courts can review legislation for constitutionality>"
    },

    6. "legalCodes": {
        "civilCode": { "name": "<official name>", "yearAdopted": <year>, "basedOn": "<e.g. Napoleonic Code, German BGB>", "keyProvisions": "<summary of major areas covered>" },
        "criminalCode": { "name": "<official name>", "yearAdopted": <year>, "keyProvisions": "<summary — categories of offenses, sentencing framework>" },
        "commercialCode": { "name": "<official name>", "yearAdopted": <year>, "keyProvisions": "<summary>" },
        "laborCode": { "name": "<official name>", "yearAdopted": <year>, "keyProvisions": "<worker protections, union rights, minimum wage provisions>" },
        "familyCode": { "name": "<official name>", "yearAdopted": <year>, "keyProvisions": "<marriage, divorce, custody, inheritance>" },
        "administrativeCode": { "name": "<official name>", "yearAdopted": <year>, "keyProvisions": "<government procedures, administrative law>" },
        "otherMajorCodes": [
            { "name": "<code name>", "yearAdopted": <year>, "keyProvisions": "<summary>" }
        ]
    },

    7. "lawEnforcement": {
        "policeForces": [
            {
                "name": "<official name>",
                "type": "<national | regional | local | specialized>",
                "head": "<current head/chief/director>",
                "approximateSize": <number of personnel>,
                "structure": "<organizational structure>",
                "jurisdiction": "<what areas/crimes they cover>",
                "yearEstablished": <year>
            }
        ],
        "intelligenceAgencies": [
            {
                "name": "<official name>",
                "head": "<current director>",
                "focus": "<domestic intelligence, foreign intelligence, signals, etc.>",
                "yearEstablished": <year>,
                "approximateSize": "<if publicly known>"
            }
        ],
        "paramilitaryForces": [
            {
                "name": "<official name>",
                "role": "<border security, internal security, gendarmerie, etc.>",
                "size": <number>,
                "description": "<details>"
            }
        ],
        "oversightBodies": ["<list civilian oversight mechanisms for law enforcement>"]
    },

    8. "criminalJustice": {
        "prisonSystem": {
            "governingBody": "<ministry or agency overseeing prisons>",
            "totalPrisonPopulation": <number>,
            "incarcerationRate": "<per 100,000 population>",
            "numberOfFacilities": <number>,
            "occupancyRate": "<percentage — is the system overcrowded?>",
            "majorPrisons": [
                { "name": "<prison name>", "location": "<city>", "type": "<maximum security | medium | minimum | remand>", "capacity": <number>, "notable": "<any notable facts>" }
            ]
        },
        "deathPenalty": {
            "status": "<abolitionist | abolitionist in practice | retentionist>",
            "methodOfExecution": "<if applicable>",
            "crimesEligible": ["<list crimes punishable by death>"],
            "lastExecution": "<year of last execution>",
            "moratorium": <true/false>,
            "publicOpinion": "<general public sentiment>"
        },
        "juvenileJustice": "<how the system handles minors>",
        "alternativeSentencing": ["<probation, community service, restorative justice, etc.>"],
        "pretrialDetention": "<average length and conditions>"
    },

    9. "humanRightsRecord": {
        "overallAssessment": "<summary of human rights situation>",
        "keyIssues": [
            { "issue": "<e.g. press freedom, minority rights, torture, extrajudicial killings>", "description": "<details>", "severity": "<critical | serious | moderate | minor>" }
        ],
        "internationalCriticisms": ["<specific criticisms from UN bodies, HRW, Amnesty International, etc.>"],
        "freedomIndices": {
            "freedomHouseScore": "<score and rating>",
            "pressFredomIndex": "<RSF ranking>",
            "democracyIndex": "<EIU score and classification>"
        },
        "nationalHumanRightsInstitution": "<name and role of NHRI if one exists>",
        "recentDevelopments": ["<recent significant human rights events or changes>"]
    },

    10. "internationalTreaties": {
        "humanRightsTreaties": [
            { "name": "<full treaty name>", "signed": "<year>", "ratified": "<year or 'not ratified'>", "reservations": "<any significant reservations>" }
        ],
        "tradeTreaties": [
            { "name": "<treaty/agreement name>", "signed": "<year>", "type": "<bilateral | multilateral | FTA | customs union>" }
        ],
        "environmentalTreaties": [
            { "name": "<treaty name>", "signed": "<year>", "ratified": "<year>", "status": "<compliance status>" }
        ],
        "otherMajorTreaties": [
            { "name": "<treaty name>", "category": "<arms control | maritime | space | etc.>", "signed": "<year>" }
        ],
        "internationalOrganizations": ["<list ALL international organizations the country is a member of — UN, WTO, ICC, regional bodies, etc.>"]
    },

    11. "barAssociation": {
        "name": "<official name of the bar association or law society>",
        "yearEstablished": <year>,
        "membershipRequirements": "<education, bar exam, apprenticeship, etc.>",
        "numberOfLawyers": <approximate number of licensed lawyers>,
        "lawyersPerCapita": "<ratio>",
        "mandatoryMembership": <true/false>,
        "regulatoryRole": "<does it regulate the profession, handle discipline, etc.>",
        "specializations": ["<recognized legal specializations>"]
    },

    12. "landmarkCases": [
        {
            "year": <year>,
            "caseName": "<official case name>",
            "court": "<which court decided it>",
            "significance": "<why this case matters — what legal principle it established>",
            "outcome": "<brief summary of the ruling>",
            "legalArea": "<constitutional | criminal | civil | administrative | human rights | etc.>"
        }
    ],
    — PROVIDE AT LEAST 10 LANDMARK CASES. Include the most consequential judicial decisions in this country's history.

    13. "legalEducation": {
        "degreeRequired": "<LLB, JD, or equivalent>",
        "typicalDuration": "<years of study>",
        "barExamSystem": "<description of bar examination or qualification process>",
        "continuingEducation": "<mandatory CLE requirements>",
        "topLawSchools": [
            { "name": "<law school name>", "university": "<parent university>", "city": "<location>", "founded": <year>, "ranking": "<national or international ranking if notable>" }
        ],
        "accreditationBody": "<body that accredits law programs>"
    },

    14. "currentLegalIssues": {
        "pendingLegislation": [
            { "name": "<bill/law name>", "status": "<in committee | passed one chamber | pending vote>", "description": "<what it proposes>", "controversy": "<why it matters>" }
        ],
        "legalControversies": [
            { "issue": "<description of controversy>", "parties": "<who is involved>", "status": "<ongoing | resolved>", "significance": "<why it matters>" }
        ],
        "legalReforms": ["<any ongoing or planned legal reform initiatives>"],
        "majorOngoingTrials": ["<significant trials currently in progress>"]
    }

    CRITICAL INSTRUCTIONS:
    - Return VALID JSON ONLY. No markdown, no commentary, no wrapping.
    - Every field must be populated with real, accurate data for ${countryName}.
    - If a section does not apply (e.g., no death penalty), still include the field with appropriate values indicating inapplicability.
    - Use the most current data available.
    - For landmark cases, provide AT LEAST 10 entries.
    - For treaties, be comprehensive — list ALL major treaties signed or ratified.
    - For law enforcement, include ALL known agencies.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            maxOutputTokens: 8000,
            thinkingConfig: { thinkingBudget: 4096 }
        }
    });

    return safeParse(response.text || '{}', {});
};

export const fetchSpecificLaw = async (countryName: string, query: string): Promise<string> => {
    const prompt = `
    TASK: ANALYZE SPECIFIC LAW/CODE: "${query}" in the jurisdiction of ${countryName}.
    Use your comprehensive legal knowledge to provide accurate details about this law.

    PROVIDE A DETAILED MEMO COVERING:
    1. Official Title & Year of Enactment (if applicable).
    2. Primary Purpose & Scope.
    3. Key Provisions/Articles (Summary of text).
    4. Current Status (Active/Repealed/Amended).
    5. Notable Controversies or Applications (if any).

    FORMAT: Plain text, structured with headings. Academic/Legal tone.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            maxOutputTokens: 2048,
            tools: [{googleSearch: {}}]
        }
    });

    return response.text || "Legal database query returned no results.";
};
