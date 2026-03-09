
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryHistory = async (countryName: string) => {
    const prompt = `
    GENERATE THE DEFINITIVE, EXHAUSTIVE HISTORICAL RECORD OF ${countryName}.
    PROTOCOL: POLI MASTER ARCHIVE V2 — COMPLETE NATIONAL HISTORY COMPENDIUM.

    You are a world-class historian compiling the most thorough historical dossier ever assembled for ${countryName}.
    Every section must be deeply researched, richly detailed, and academically rigorous.
    Do NOT summarize. Do NOT abbreviate. Provide the FULL historical record.

    ============================================================
    SECTION 1: POLITICAL HISTORY NARRATIVE (politicalHistory)
    ============================================================
    Write a COMPREHENSIVE political history narrative of ${countryName} spanning from the EARLIEST known civilizations
    and ancient settlements through to the present day (2020s). This must be AT LEAST 1000 words organized into
    multiple detailed paragraphs covering:
    - Pre-history and earliest known inhabitants, archaeological evidence, indigenous peoples
    - Ancient kingdoms, empires, and early state formation
    - Medieval/pre-modern political structures, feudal systems, tribal confederations
    - Early modern period: centralization, absolutism, or equivalent political developments
    - Colonial encounters (if applicable): initial contact, conquest, resistance, administration
    - Path to independence or modern statehood: movements, leaders, ideologies, pivotal moments
    - Post-independence nation-building: first governments, constitutions, political parties
    - Cold War era dynamics: alignments, proxy conflicts, ideological struggles
    - Late 20th century: democratization, authoritarianism, economic liberalization
    - 21st century: current political landscape, recent elections, ongoing challenges, regional role
    Return as a single string with paragraph breaks.

    ============================================================
    SECTION 2: COMPLETE TIMELINE (timeline)
    ============================================================
    Provide AT LEAST 50 major historical events as an array. Each event MUST include:
    - "year": the exact year (or date range like "1914-1918")
    - "title": concise event name
    - "description": a DETAILED description of AT LEAST 100 words explaining what happened, why it happened,
      the immediate consequences, and the long-term impact on the country
    - "significance": why this event was a turning point or watershed moment for the nation
    - "keyFigures": array of names of the most important people involved in this event
    Cover events from ancient history through 2024. Include political, military, economic, social, and cultural events.
    Space events across ALL eras — do not cluster them in modern times only.

    ============================================================
    SECTION 3: FOUNDING / INDEPENDENCE (foundingHistory)
    ============================================================
    Provide a detailed object with:
    - "date": the exact founding or independence date (e.g., "July 4, 1776")
    - "circumstances": a thorough narrative (300+ words) of how the country was founded or gained independence,
      including the political climate, key negotiations, battles, declarations, and international recognition
    - "foundingFigures": array of objects each with "name", "role" (their specific contribution), and "biography"
      (100+ word biography of each figure). Include ALL major founding fathers AND founding mothers.
    - "foundingDocuments": array of objects with "name", "date", and "significance" for each founding document
    - "predecessorStates": what political entities existed before the current state

    ============================================================
    SECTION 4: COLONIAL HISTORY (colonialHistory)
    ============================================================
    Provide a detailed object with:
    - "wasColonized": boolean
    - "wasColonizer": boolean
    - "colonialPeriods": array of objects each with "colonizer", "startYear", "endYear", "description" (200+ words
      on administration, exploitation, cultural impact), and "resistanceMovements" (array of movements with names,
      leaders, dates, methods, and outcomes)
    - "coloniesHeld": array of territories the country colonized (if applicable), with dates and details
    - "decolonizationProcess": detailed narrative of how colonial rule ended
    - "colonialLegacy": lasting impacts of colonialism on politics, economy, culture, and society

    ============================================================
    SECTION 5: MAJOR WARS & CONFLICTS (warsAndConflicts)
    ============================================================
    Provide an array of EVERY significant war, conflict, civil war, insurgency, or military engagement
    the country participated in. Each entry MUST include:
    - "name": official name of the conflict
    - "startYear" and "endYear"
    - "type": "civil war" | "international war" | "colonial war" | "insurgency" | "revolution" | "border conflict" | "world war"
    - "description": detailed account (200+ words) of causes, major battles, strategies, and course of the war
    - "belligerents": who fought on each side
    - "casualties": estimated military and civilian casualties for ${countryName}
    - "outcome": victory, defeat, stalemate, treaty terms
    - "consequences": political, territorial, economic, and social consequences
    - "keyFigures": military and political leaders involved

    ============================================================
    SECTION 6: CONSTITUTIONAL HISTORY (constitutionalHistory)
    ============================================================
    Provide an array of EVERY constitution the country has had, plus major constitutional amendments or reforms:
    - "name": name/title of the constitution or amendment
    - "year": year adopted
    - "description": what it established, key provisions, rights granted or removed
    - "context": political circumstances leading to its adoption
    - "keyChanges": array of the most important provisions or changes introduced
    - "stillInEffect": boolean

    ============================================================
    SECTION 7: REGIME CHANGES (regimeChanges)
    ============================================================
    Provide an array of EVERY significant change in government type or political system:
    - "year": when it occurred
    - "fromSystem": previous system (e.g., "absolute monarchy", "military dictatorship", "colonial rule")
    - "toSystem": new system (e.g., "constitutional monarchy", "republic", "one-party state")
    - "method": how the change happened (revolution, coup, reform, foreign intervention, negotiation, election)
    - "description": detailed account (150+ words) of how and why the regime change occurred
    - "keyFigures": people who drove or resisted the change
    - "aftermath": immediate consequences of the transition

    ============================================================
    SECTION 8: ECONOMIC HISTORY (economicHistory)
    ============================================================
    Provide an array of major economic events, reforms, and crises:
    - "year": when it occurred
    - "title": name of the event/reform/crisis
    - "type": "reform" | "crisis" | "boom" | "industrialization" | "trade" | "nationalization" | "privatization" | "sanctions"
    - "description": detailed account (150+ words) of causes, policies, and outcomes
    - "impact": lasting effects on the economy and society
    - "keyFigures": economists, politicians, and business leaders involved

    ============================================================
    SECTION 9: SOCIAL MOVEMENTS (socialMovements)
    ============================================================
    Provide an array of ALL significant social movements in the country's history:
    - "name": name of the movement
    - "period": start and end years (or "ongoing")
    - "type": "civil rights" | "suffrage" | "labor" | "independence" | "anti-apartheid" | "pro-democracy" | "environmental" | "religious" | "ethnic" | "student" | "other"
    - "description": detailed account (150+ words) of goals, methods, key events, and achievements
    - "leaders": array of key leaders with names and roles
    - "outcome": what the movement achieved or failed to achieve
    - "legacy": lasting impact on society and politics

    ============================================================
    SECTION 10: DIPLOMATIC HISTORY (diplomaticHistory)
    ============================================================
    Provide an array of major treaties, alliances, diplomatic incidents, and international relationships:
    - "year": when it occurred
    - "title": name of the treaty, alliance, or incident
    - "type": "treaty" | "alliance" | "conflict" | "recognition" | "sanctions" | "membership" | "agreement"
    - "parties": countries or organizations involved
    - "description": detailed account (100+ words) of the diplomatic event
    - "consequences": impact on the country's international standing and relationships

    ============================================================
    SECTION 11: LEADERS CHRONOLOGY (leadersChronology)
    ============================================================
    Provide a COMPLETE chronological array of ALL heads of state and/or heads of government from the
    country's founding (or earliest recorded ruler) to the present. Each entry MUST include:
    - "name": full name and any titles
    - "position": their title (King, President, Prime Minister, Emperor, Sultan, etc.)
    - "termStart": start date or year of their rule
    - "termEnd": end date or year (or "present" if current)
    - "party": political party or faction (if applicable)
    - "notableActions": array of their most significant policies, reforms, or events during their tenure
    - "howTermEnded": how they left office (election loss, death, coup, resignation, term limit, etc.)
    Include EVERY leader — do not skip any. For countries with long histories, include ancient rulers as well.

    ============================================================
    SECTION 12: CULTURAL MILESTONES (culturalMilestones)
    ============================================================
    Provide an array of major cultural, scientific, and intellectual achievements that had political impact:
    - "year": when it occurred
    - "title": name of the achievement or milestone
    - "category": "literature" | "science" | "art" | "music" | "philosophy" | "technology" | "education" | "religion" | "architecture" | "sport"
    - "description": what was achieved and its cultural significance
    - "politicalImpact": how this milestone influenced politics, national identity, or international perception
    - "keyFigures": people involved

    ============================================================
    OUTPUT FORMAT
    ============================================================
    Return ONLY valid JSON with this exact structure:
    {
        "politicalHistory": "string (1000+ words)",
        "timeline": [ ...50+ event objects... ],
        "foundingHistory": { ... },
        "colonialHistory": { ... },
        "warsAndConflicts": [ ... ],
        "constitutionalHistory": [ ... ],
        "regimeChanges": [ ... ],
        "economicHistory": [ ... ],
        "socialMovements": [ ... ],
        "diplomaticHistory": [ ... ],
        "leadersChronology": [ ... ],
        "culturalMilestones": [ ... ]
    }

    CRITICAL RULES:
    - Return ONLY raw JSON. No markdown, no code fences, no commentary.
    - Every string field must be substantive and detailed — no placeholders, no "etc.", no "and more".
    - Prioritize ACCURACY. Use real historical dates, real names, real events.
    - Be EXHAUSTIVE. This is meant to be a complete national historical archive.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8000 }
    });

    return safeParse(response.text || '{}', {});
};
