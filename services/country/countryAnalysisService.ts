
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryAnalysis = async (countryName: string): Promise<any> => {
    const prompt = `
POLI ARCHIVE — COMPREHENSIVE STRATEGIC COUNTRY ANALYSIS: ${countryName}
CLASSIFICATION: TOP-LEVEL GEOPOLITICAL INTELLIGENCE ASSESSMENT
PROTOCOL: POLI ARCHIVE V3 — MAXIMUM DEPTH STRATEGIC BRIEFING

${getLanguageInstruction()}

You are POLI's Chief Strategic Analyst and Senior Intelligence Officer. Produce an EXHAUSTIVE, ENCYCLOPEDIC strategic political analysis of ${countryName}. This document must read like a fusion of a classified intelligence briefing, an academic political science treatise, and a strategic consultancy report from a top-tier geopolitical advisory firm.

Every section below is MANDATORY. Do NOT abbreviate, summarize prematurely, or skip any subsection. Each section has a MINIMUM word count that MUST be met.

═══════════════════════════════════════════════════════════════
SECTION 1: STRATEGIC ANALYSIS (MINIMUM 800 WORDS)
═══════════════════════════════════════════════════════════════
Produce a deep, multi-layered geopolitical assessment covering ALL of the following:

- GEOPOLITICAL POSITIONING: Analyze the country's geographic location as a strategic asset or liability. Discuss chokepoints, buffer zones, maritime access, land borders, and how geography shapes its grand strategy. Assess whether it is a heartland power, rimland power, maritime power, or peripheral state.

- POWER DYNAMICS: Map the internal and external power dynamics. Who holds real power? How is power contested? What are the key power transitions underway? Analyze the balance between executive, legislative, judicial, military, and economic elites.

- ALLIANCE NETWORKS & PARTNERSHIPS: Detail every significant alliance, treaty organization, bilateral partnership, and strategic alignment. Assess the strength and reliability of each alliance. Identify any alliance shifts or realignments underway. Cover military alliances, economic partnerships, intelligence-sharing arrangements, and diplomatic coalitions.

- GRAND STRATEGY: What is the country's overarching grand strategy? Is it expansionist, status quo, revisionist, or isolationist? How does it balance internal development with external projection? What are the key strategic documents or doctrines that guide national strategy?

- MILITARY-STRATEGIC POSTURE: Force projection capability, defense spending trends, military modernization programs, conscription vs professional military, nuclear/WMD status, cyber warfare capabilities, space and satellite programs, and intelligence community strength.

- ECONOMIC STATECRAFT: How does the country use economic tools for geopolitical advantage? Sanctions capability, trade leverage, resource diplomacy, currency influence, development aid as soft power, economic coercion tools.

- THREAT MATRIX: Rank and analyze the top internal and external threats by severity, probability, and potential impact.

═══════════════════════════════════════════════════════════════
SECTION 2: POLITICAL CULTURE ANALYSIS (MINIMUM 500 WORDS)
═══════════════════════════════════════════════════════════════
Provide a deep psychographic and sociological analysis:

- CORE POLITICAL VALUES: What are the foundational political values of the society? How do these values manifest in political behavior, policy preferences, and institutional design? Discuss individualism vs collectivism, attitudes toward authority, egalitarianism, nationalism, religiosity in politics.

- POLITICAL TRADITIONS: Trace the major political traditions and ideological currents. How have historical events shaped contemporary political culture? What are the defining political narratives and national myths?

- CIVIC PARTICIPATION: Voter turnout trends, forms of political engagement beyond voting (protests, petitions, party membership, community organizing), digital activism, youth political engagement, barriers to participation.

- TRUST & LEGITIMACY: Public trust levels in key institutions (government, military, judiciary, media, police, religious institutions, political parties). How has trust evolved over time? What drives trust or distrust?

- IDENTITY CLEAVAGES: Ethnic, religious, linguistic, regional, urban-rural, generational, and class-based political divisions. How are these cleavages managed or exploited? Risk of identity-based conflict.

- MEDIA LANDSCAPE: Media freedom, ownership concentration, state vs independent media, social media influence on politics, disinformation vulnerabilities, press freedom index assessment.

═══════════════════════════════════════════════════════════════
SECTION 3: SWOT ANALYSIS (MINIMUM 200 WORDS PER CATEGORY)
═══════════════════════════════════════════════════════════════
Provide a rigorous SWOT analysis with strategic depth:

- STRENGTHS (200+ words): Identify and thoroughly analyze at least 5 major political, institutional, economic, military, diplomatic, and cultural strengths. For each strength, explain HOW it provides strategic advantage and how durable it is.

- WEAKNESSES (200+ words): Identify and thoroughly analyze at least 5 major vulnerabilities, structural deficits, institutional failures, economic dependencies, social fractures, and governance gaps. For each weakness, assess severity and whether it is worsening or improving.

- OPPORTUNITIES (200+ words): Identify and thoroughly analyze at least 5 major opportunities including geopolitical shifts, technological changes, demographic trends, economic openings, diplomatic windows, and reform possibilities. For each opportunity, assess likelihood of realization and potential impact.

- THREATS (200+ words): Identify and thoroughly analyze at least 5 major threats including security threats, economic risks, demographic challenges, environmental vulnerabilities, technological disruptions, and geopolitical dangers. For each threat, assess probability, timeline, and potential severity.

═══════════════════════════════════════════════════════════════
SECTION 4: STABILITY ASSESSMENT
═══════════════════════════════════════════════════════════════
- POLITICAL STABILITY INDEX: Provide a numerical score from 0-100 (where 100 is perfectly stable) with detailed justification.
- KEY RISK FACTORS: Enumerate and analyze every major factor that could destabilize the political system, ranked by severity.
- STABILITY SCENARIOS: Describe three scenarios — stability maintained, gradual erosion, rapid destabilization — with triggers and indicators for each.
- INSTITUTIONAL RESILIENCE: How strong are the institutions that maintain stability? Could they survive a severe shock (economic crisis, leadership vacuum, security emergency)?
- SOCIAL COHESION: Assess the degree of social solidarity vs fragmentation. What are the fault lines that could fracture under pressure?

═══════════════════════════════════════════════════════════════
SECTION 5: CORRUPTION ANALYSIS
═══════════════════════════════════════════════════════════════
- CPI SCORE & RANKING: Provide Transparency International's Corruption Perceptions Index score and global ranking (or best estimate). Analyze the trend over the past decade.
- CORRUPTION TYPOLOGY: What forms does corruption take? (grand corruption, petty corruption, state capture, clientelism, nepotism, kleptocracy). Which sectors are most affected?
- MAJOR CORRUPTION CASES: Detail the most significant corruption scandals in recent history. Who was involved? What were the consequences?
- ANTI-CORRUPTION FRAMEWORK: Assess anti-corruption institutions, laws, enforcement, whistleblower protections, asset declaration systems, and their effectiveness.
- CORRUPTION'S POLITICAL IMPACT: How does corruption shape political competition, public trust, economic development, and international reputation?

═══════════════════════════════════════════════════════════════
SECTION 6: POWER STRUCTURE
═══════════════════════════════════════════════════════════════
- FORMAL POWER CENTERS: Map the constitutional/legal power structure. How does power flow through formal institutions? Where are the bottlenecks and veto points?
- INFORMAL POWER CENTERS: Identify the shadow power structures — oligarchs, business tycoons, family dynasties, tribal/clan networks, criminal organizations, intelligence agencies operating beyond oversight, military-industrial complex.
- MILITARY INFLUENCE: What is the military's role in politics? Has there been a history of coups or military intervention? Is civilian control of the military firmly established?
- RELIGIOUS INFLUENCE: How do religious institutions and leaders shape politics? Is there separation of church/mosque/temple and state? Religious parties and movements.
- OLIGARCHIC NETWORKS: Who are the key oligarchs or economic power brokers? How do they influence policy, media, and elections? What is the relationship between wealth and political power?
- DEEP STATE: Is there evidence of permanent bureaucratic/security structures operating independently of elected officials?

═══════════════════════════════════════════════════════════════
SECTION 7: FOREIGN POLICY DOCTRINE
═══════════════════════════════════════════════════════════════
- CORE DOCTRINE: What is the country's foreign policy doctrine or strategic concept? How has it evolved?
- MAJOR POSITIONS: Stance on key international issues (UN reform, climate change, nuclear proliferation, trade liberalization, human rights, sovereignty vs intervention).
- KEY BILATERAL RELATIONSHIPS: Analyze the 5 most important bilateral relationships in depth — strategic importance, areas of cooperation, friction points, trajectory.
- MULTILATERAL ENGAGEMENT: Role in UN, regional organizations, economic blocs, military alliances. Leadership vs follower role.
- DIPLOMATIC STYLE: Is the country's diplomacy assertive, conciliatory, transactional, ideological, pragmatic? How does it negotiate?

═══════════════════════════════════════════════════════════════
SECTION 8: REGIONAL INFLUENCE
═══════════════════════════════════════════════════════════════
- SPHERE OF INFLUENCE: Define the country's sphere of influence — geographic, economic, cultural, military. How is this sphere maintained or contested?
- REGIONAL LEADERSHIP: Does the country play a leadership role in its region? Is this leadership accepted, contested, or resented by neighbors?
- REGIONAL RIVALRIES: Key regional competitors and the nature of competition (military, economic, ideological, territorial).
- REGIONAL ORGANIZATIONS: Role in regional institutions and how it uses them to advance national interests.
- SOFT POWER PROJECTION: Cultural influence, educational exchanges, media reach, diaspora networks, development aid in the region.

═══════════════════════════════════════════════════════════════
SECTION 9: FUTURE SCENARIOS (MINIMUM 200 WORDS EACH)
═══════════════════════════════════════════════════════════════
Develop three detailed, plausible scenarios for the country's political trajectory over the next 10-15 years:

- OPTIMISTIC SCENARIO (200+ words): Best realistic case. What reforms succeed? What opportunities are seized? What does the country look like if things go well? Include specific policy changes, institutional improvements, economic developments, and geopolitical positioning.

- BASELINE SCENARIO (200+ words): Most likely trajectory. Continuation of current trends with marginal changes. Where is the country headed on its current path? What stays the same and what slowly evolves? Include specific projections.

- PESSIMISTIC SCENARIO (200+ words): Worst realistic case (not apocalyptic, but seriously negative). What goes wrong? What crises erupt? What institutions fail? Include specific risk materializations, political crises, economic problems, and security deterioration.

═══════════════════════════════════════════════════════════════
SECTION 10: KEY CHALLENGES
═══════════════════════════════════════════════════════════════
List and analyze the TOP 10 political challenges facing the country, ranked by importance. For each challenge, provide:
- Description of the challenge
- Root causes
- Current government response
- Prognosis (improving, stable, worsening)
- Potential consequences if unaddressed

═══════════════════════════════════════════════════════════════
SECTION 11: COMPARATIVE ANALYSIS
═══════════════════════════════════════════════════════════════
- SIMILAR POLITICAL SYSTEMS: Identify 3-5 countries with comparable political systems, governance models, or geopolitical positions. Explain the basis for comparison.
- BENCHMARKING: How does the country perform relative to its peers on key governance indicators (democracy index, rule of law, economic freedom, human development)?
- LESSONS FROM PEERS: What lessons could the country learn from the successes or failures of comparable nations?
- HISTORICAL PARALLELS: Are there historical parallels to the country's current political situation? What can be learned from them?

═══════════════════════════════════════════════════════════════
SECTION 12: EXPERT COMMENTARY
═══════════════════════════════════════════════════════════════
- THINK TANK PERSPECTIVES: Summarize how major international think tanks and research institutions (e.g., Brookings, CSIS, Chatham House, Carnegie, RAND, CFR, IISS, Crisis Group) assess this country.
- SCHOLARLY CONSENSUS: What do leading political scientists and area studies scholars identify as the key dynamics?
- DIVERGENT VIEWS: Where do experts disagree? What are the major debates in the analytical community?
- INTELLIGENCE COMMUNITY ASSESSMENT: What would a national intelligence estimate likely highlight as the key findings?

═══════════════════════════════════════════════════════════════
OUTPUT FORMAT — RETURN VALID JSON ONLY:
═══════════════════════════════════════════════════════════════
{
    "strategicAnalysis": "string (minimum 800 words — comprehensive geopolitical positioning, power dynamics, alliances, grand strategy, military posture, economic statecraft, threat matrix)",
    "politicalCulture": "string (minimum 500 words — values, traditions, civic participation, trust, identity cleavages, media landscape)",
    "swpiAnalysis": {
        "strengths": "string (minimum 200 words — at least 5 strengths with strategic depth)",
        "weaknesses": "string (minimum 200 words — at least 5 weaknesses with severity assessment)",
        "opportunities": "string (minimum 200 words — at least 5 opportunities with likelihood assessment)",
        "threats": "string (minimum 200 words — at least 5 threats with probability and timeline)"
    },
    "stabilityAssessment": {
        "stabilityIndex": "number (0-100)",
        "riskFactors": "string (detailed analysis of destabilizing factors)",
        "scenarios": "string (stability maintained, gradual erosion, rapid destabilization)",
        "institutionalResilience": "string",
        "socialCohesion": "string"
    },
    "corruptionAnalysis": {
        "cpiScore": "string (score, ranking, and trend analysis)",
        "corruptionTypology": "string (forms and sectors affected)",
        "majorCases": "string (significant scandals detailed)",
        "antiCorruptionFramework": "string (institutions, laws, effectiveness)",
        "politicalImpact": "string (how corruption shapes politics)"
    },
    "powerStructure": {
        "formalPowerCenters": "string (constitutional power map)",
        "informalPowerCenters": "string (shadow structures, oligarchs, networks)",
        "militaryInfluence": "string (military role in politics)",
        "religiousInfluence": "string (religion in political life)",
        "oligarchicNetworks": "string (wealth-power nexus)",
        "deepState": "string (permanent structures beyond oversight)"
    },
    "foreignPolicyDoctrine": {
        "coreDoctrine": "string (strategic concept and evolution)",
        "majorPositions": "string (stance on key international issues)",
        "keyBilateralRelationships": "string (top 5 relationships analyzed in depth)",
        "multilateralEngagement": "string (role in international organizations)",
        "diplomaticStyle": "string (negotiation approach and characteristics)"
    },
    "regionalInfluence": {
        "sphereOfInfluence": "string (geographic, economic, cultural, military reach)",
        "regionalLeadership": "string (leadership role assessment)",
        "regionalRivalries": "string (key competitors and nature of competition)",
        "regionalOrganizations": "string (institutional role)",
        "softPowerProjection": "string (cultural and diplomatic influence)"
    },
    "futureScenarios": {
        "optimistic": "string (minimum 200 words — best realistic case with specific projections)",
        "baseline": "string (minimum 200 words — most likely trajectory with specific projections)",
        "pessimistic": "string (minimum 200 words — worst realistic case with specific risk materializations)"
    },
    "keyChallenges": ["string (each challenge: description, root causes, government response, prognosis, consequences — exactly 10 challenges)"],
    "comparativeAnalysis": {
        "similarSystems": "string (3-5 comparable countries with basis for comparison)",
        "benchmarking": "string (performance relative to peers on governance indicators)",
        "lessonsFromPeers": "string (applicable lessons from comparable nations)",
        "historicalParallels": "string (relevant historical parallels and lessons)"
    },
    "expertCommentary": {
        "thinkTankPerspectives": "string (assessments from major research institutions)",
        "scholarlyConsensus": "string (key dynamics identified by leading scholars)",
        "divergentViews": "string (major analytical debates)",
        "intelligenceAssessment": "string (likely intelligence community key findings)"
    },
    "overallAssessment": "string (300-word executive summary synthesizing all sections)"
}

CRITICAL INSTRUCTIONS:
- Return ONLY valid JSON, no markdown, no code blocks, no commentary.
- Every string field must be substantive, analytical, and meet minimum word counts.
- Use specific data, names, dates, and facts wherever possible.
- Maintain an objective, analytical tone throughout.
- Do NOT use placeholder text or generic statements that could apply to any country.
- Every word must be specifically about ${countryName}.
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
