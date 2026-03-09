
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { AnalysisProfile } from "../../types";

export const fetchCountryAnalysis = async (countryName: string): Promise<AnalysisProfile> => {
    const prompt = `
POLI ARCHIVE — DEEP STRATEGIC ANALYSIS: ${countryName}
CLASSIFICATION: COMPREHENSIVE GEOPOLITICAL ASSESSMENT
PROTOCOL: POLI ARCHIVE V2 — DEEP THOUGHT

${getLanguageInstruction()}

You are POLI's Chief Strategic Analyst. Generate an EXHAUSTIVE strategic political analysis of ${countryName}. This should read like a classified intelligence briefing combined with an academic political science treatise.

MANDATORY REQUIREMENTS:

1. STRATEGIC ANALYSIS (minimum 1000 words):
   - Grand strategy and national interests
   - Geopolitical position: geographic advantages/vulnerabilities
   - Military-strategic assessment: force projection capability, defense posture
   - Economic statecraft: sanctions capability, trade leverage, resource diplomacy
   - Diplomatic capital: soft power, alliance networks, multilateral influence
   - Nuclear/WMD status if applicable
   - Cyber capabilities and information warfare posture
   - Space program and strategic implications
   - Intelligence community assessment
   - Threat matrix: internal and external threats ranked by severity

2. POLITICAL CULTURE ANALYSIS (minimum 500 words):
   - Deep psychographic profile of the electorate
   - Political socialization: how citizens learn politics
   - Civic participation patterns: voting, protest, volunteering
   - Trust in institutions: government, military, judiciary, media, religious
   - Corruption perception and tolerance
   - Authoritarian vs democratic tendencies
   - Identity politics: ethnic, religious, linguistic cleavages
   - Generational political shifts
   - Urban-rural political divide
   - Class-based political behavior

3. STATE CAPACITY ASSESSMENT (minimum 400 words):
   - Bureaucratic quality and professionalism
   - Tax collection efficiency
   - Law enforcement effectiveness
   - Infrastructure provision capability
   - Crisis response capability (natural disasters, pandemics)
   - Digital governance maturity
   - Regulatory enforcement
   - Border control effectiveness

4. CIVIL SOCIETY STRENGTH (minimum 400 words):
   - NGO landscape: number, types, influence
   - Media freedom: press freedom index, independent media outlets
   - Labor unions: strength, membership, political influence
   - Social movements: historical and current
   - Religious organizations: political role
   - Academic freedom
   - Internet freedom
   - Diaspora influence

5. LEGITIMACY ANALYSIS (minimum 300 words):
   - Source of legitimacy (Traditional, Rational-Legal, Charismatic, Performance)
   - Electoral legitimacy: free/fair elections assessment
   - Constitutional legitimacy
   - Popular satisfaction and protest potential
   - Regime stability forecast

6. FUTURE TRAJECTORY (minimum 300 words):
   - Short-term outlook (1-3 years)
   - Medium-term trajectory (5-10 years)
   - Long-term strategic position (20-50 years)
   - Key inflection points and scenarios
   - Risk factors and wildcards

RETURN VALID JSON ONLY:
{
    "strategicAnalysis": "string (minimum 1000 words — comprehensive strategic assessment)",
    "politicalCulture": "string (minimum 500 words — deep psychographic analysis)",
    "stateCapacity": "string (minimum 400 words — bureaucratic assessment)",
    "civilSociety": "string (minimum 400 words — NGO and media landscape)",
    "legitimacy": "string (minimum 300 words — regime legitimacy analysis)",
    "futureTrajectory": "string (minimum 300 words — forward-looking assessment)",
    "riskFactors": ["string (each a detailed risk with probability and impact assessment)"],
    "strengths": ["string"],
    "weaknesses": ["string"],
    "opportunities": ["string"],
    "threats": ["string"],
    "overallAssessment": "string (200-word summary verdict)"
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {}) as AnalysisProfile;
};
