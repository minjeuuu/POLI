
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchPolitics = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — EXHAUSTIVE POLITICAL LANDSCAPE DOSSIER: ${countryName}
CLASSIFICATION: MAXIMUM-DEPTH POLITICAL SYSTEM ANALYSIS
PROTOCOL: POLI ARCHIVE V3 — ENCYCLOPEDIC EDITION

${getLanguageInstruction()}

You are POLI, the world's most comprehensive political intelligence system. Generate an EXHAUSTIVE political landscape dossier for ${countryName}. Leave NOTHING out. Every party, every election, every dynasty, every movement, every index score.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1: ALL POLITICAL PARTIES — COMPLETE REGISTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

List EVERY registered political party in ${countryName} — not just the top 5 or top 10, but ALL of them. Include active parties, recently dissolved parties, and historically significant parties. If the country has 80 registered parties, list all 80.

For EACH party provide:
- Full official name and abbreviation/acronym
- Ideology (e.g., social democracy, conservatism, libertarianism, Islamism, communism, green politics, etc.)
- Political position on the spectrum (far-left, left, center-left, center, center-right, right, far-right)
- Current status: ruling party, ruling coalition member, main opposition, opposition, minor opposition, extra-parliamentary, dissolved
- Current party leader (full name and title)
- Secretary-general or equivalent officer (full name)
- Founding date (exact day if known, otherwise year)
- Seats in EACH legislative chamber (upper house and lower house separately; use 0 if none)
- Headquarters city and address if known
- Official website URL
- Official party color(s) and hex code if widely known
- Logo/symbol description (e.g., "red rose", "green cedar tree", "clenched fist")
- Estimated membership count (most recent figure available)
- Youth wing name (if any)
- Women's wing name (if any)
- International affiliations (e.g., Socialist International, Liberal International, IDU, etc.)
- Brief history: founding circumstances, major splits or mergers, key turning points
- Notable current and former members (at least 3-5 per major party)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2: COMPLETE ELECTORAL HISTORY (PAST 50+ YEARS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

List ALL national elections (presidential, parliamentary, legislative, senatorial, referendums) held in the past 50+ years. Go back further if the country has a shorter democratic history or if earlier elections are historically significant.

For EACH election provide:
- Exact date and election type (presidential, parliamentary, referendum, etc.)
- Winner: candidate/party name, vote count, vote percentage
- Runner-up: candidate/party name, vote count, vote percentage
- Third place and beyond for major elections
- Total registered voters
- Total votes cast and voter turnout percentage
- Key campaign issues and themes
- Whether the election was considered free and fair (note any irregularities, boycotts, or international observer reports)
- Government formed after the election (coalition composition if applicable)
- Significance or historical impact of the result

Also include:
- All referendums with question, result, turnout, and impact
- Any cancelled, postponed, or disputed elections with explanation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3: CURRENT POLITICAL DYNAMICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Current ruling party or coalition: list ALL member parties, their seat contributions, and the coalition agreement's key policy pillars
- Current opposition bloc(s): list ALL opposition parties, their alignment (formal opposition alliance or informal), and their policy alternatives
- Key political rivalries: name the major personal and party-level rivalries driving current politics, with context
- Current head of state and head of government: name, party, tenure start date, approval rating if available
- Upcoming elections: next scheduled election dates and what is at stake
- Current political crises or major controversies (if any)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4: ELECTORAL SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Type of electoral system: FPTP, proportional representation (list type: party-list, STV, MMP, etc.), mixed, two-round, or other
- Number of constituencies/districts and how they are drawn
- Electoral threshold (minimum vote percentage to win seats)
- Seat allocation method (D'Hondt, Sainte-Laguë, Hare quota, etc.)
- Separate explanation for each chamber if bicameral
- How the head of state is elected (direct, indirect, electoral college, parliamentary appointment, hereditary)
- Term lengths for each elected office
- Term limits (if any)
- Compulsory voting (yes/no, enforcement, penalties)
- Absentee and overseas voting provisions
- Electronic voting usage
- Electoral management body: name, independence assessment, composition
- Recent or proposed electoral reforms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5: VOTER DEMOGRAPHICS & PARTICIPATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Total registered voters (most recent figure)
- Voter registration rate as percentage of eligible population
- Voter turnout trends over the past 5+ elections (with percentages)
- Youth voter participation rate (18-30 age group) and trends
- Gender gap in voter turnout (if data available)
- Urban vs rural voting patterns
- Regional voting patterns and strongholds by party
- Ethnic or religious voting blocs (if applicable and documented)
- Diaspora voting participation
- Voter suppression concerns (if any)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6: POLITICAL FAMILIES & DYNASTIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

List ALL major political families and dynasties in ${countryName}. For EACH:
- Family/dynasty name
- Region or base of influence
- Number of generations active in politics
- ALL members who have held or currently hold political office: full name, position held, years in office, party affiliation
- Total number of offices held by the family
- Estimated wealth and business interests (if publicly known)
- Controversies or corruption allegations involving family members
- Current influence level (dominant, significant, declining, historical only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7: CAMPAIGN FINANCE & POLITICAL FUNDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Campaign finance laws: overview of the legal framework
- Spending limits: are there caps on campaign spending? What are they?
- Donation limits: individual, corporate, foreign donation rules
- Public funding: does the state fund parties/campaigns? How much and by what formula?
- Major donors and funding sources (corporate, unions, foreign, diaspora)
- Disclosure and transparency requirements
- Enforcement body and its effectiveness
- Notable campaign finance scandals
- Dark money and informal funding channels (if documented)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8: CIVIL SOCIETY & POLITICAL ECOSYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Major advocacy groups and their causes (list at least 10)
- Key NGOs operating in the political space (governance, human rights, election monitoring)
- Major media organizations and their political leanings (list at least 10: newspapers, TV channels, online outlets)
- Think tanks and policy research institutes (list all significant ones)
- Trade unions and labor organizations with political influence
- Religious organizations with political influence
- Business associations and chambers of commerce with political roles
- Student and youth political organizations
- Social media's role in political mobilization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9: POLITICAL VIOLENCE & EXTREMISM ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Presence of extremist groups (far-left, far-right, religious extremist, separatist): list each with name, ideology, estimated size, threat level
- History of political assassinations or assassination attempts (list all major ones)
- Political imprisonment: current political prisoners (if any), historical patterns
- Election-related violence: frequency, severity, patterns
- Terrorism: domestic and international threats, major incidents
- Paramilitary or militia groups with political ties
- State-sponsored violence or repression (if applicable)
- Hate groups and their political connections
- Overall political violence risk assessment (low/moderate/high/critical)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10: FREEDOM & DEMOCRACY INDICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Provide the MOST RECENT scores and historical trends for:
- Freedom House: Freedom in the World score (0-100), status (Free/Partly Free/Not Free), political rights score, civil liberties score, trend direction
- Reporters Without Borders: Press Freedom Index rank and score, trend
- Economist Intelligence Unit: Democracy Index score, rank, category (full democracy/flawed democracy/hybrid regime/authoritarian), sub-scores for electoral process, government functioning, political participation, political culture, civil liberties
- Transparency International: Corruption Perceptions Index rank and score
- V-Dem Institute: Liberal Democracy Index score
- World Justice Project: Rule of Law Index rank and score
- Human Rights Watch: most recent assessment summary
- Amnesty International: most recent assessment summary
- Provide 5-year and 10-year trend for each index (improving/declining/stable)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 11: POLITICAL REFORMS (RECENT & PENDING)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Constitutional amendments passed in the last 20 years: list each with date, subject, and impact
- Major legislative reforms (governance, electoral, judicial, anti-corruption): list each with year, description, and outcome
- Pending reform proposals currently under debate
- Decentralization or devolution reforms
- Anti-corruption reforms and their effectiveness
- Judicial independence reforms
- Electoral law changes
- Civil liberties expansions or restrictions
- International pressure for reforms (if any)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 12: MAJOR PROTEST MOVEMENTS (PAST 20 YEARS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

List ALL significant protest movements, mass demonstrations, and civil unrest events in the past 20 years. For EACH:
- Name or common designation of the movement
- Date(s) and duration
- Cause/trigger
- Estimated number of participants at peak
- Key leaders or organizers (if known)
- Government response (negotiation, concession, repression, violence)
- Outcome: what changed as a result?
- Casualties (if any)
- International reaction
- Legacy and ongoing impact

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RETURN VALID JSON ONLY. No commentary, no markdown, no explanation — ONLY the JSON object below:

{
    "parties": [
        {
            "name": "string",
            "abbreviation": "string",
            "ideology": "string",
            "politicalPosition": "string (far-left/left/center-left/center/center-right/right/far-right)",
            "status": "string (ruling/ruling coalition/main opposition/opposition/minor/extra-parliamentary/dissolved)",
            "leader": "string",
            "secretaryGeneral": "string",
            "foundingDate": "string",
            "seatsUpperHouse": "number or null",
            "seatsLowerHouse": "number or null",
            "headquarters": "string",
            "website": "string",
            "color": "string",
            "colorHex": "string or null",
            "logoDescription": "string",
            "membershipCount": "string or null",
            "youthWing": "string or null",
            "womensWing": "string or null",
            "internationalAffiliation": "string or null",
            "history": "string (min 80 words for major parties)",
            "notableMembers": ["string"]
        }
    ],
    "electoralHistory": [
        {
            "date": "string",
            "type": "string (presidential/parliamentary/legislative/senatorial/referendum)",
            "winner": "string",
            "winnerVotes": "string",
            "winnerPercentage": "string",
            "runnerUp": "string",
            "runnerUpVotes": "string",
            "runnerUpPercentage": "string",
            "thirdPlace": "string or null",
            "registeredVoters": "string",
            "totalVotesCast": "string",
            "turnoutPercentage": "string",
            "keyIssues": "string",
            "freeAndFair": "string",
            "governmentFormed": "string",
            "significance": "string"
        }
    ],
    "currentPoliticalDynamics": {
        "rulingCoalition": {
            "name": "string or null",
            "memberParties": ["string"],
            "seatTotal": "string",
            "keyPolicyPillars": ["string"]
        },
        "oppositionBlocs": [
            {
                "name": "string",
                "memberParties": ["string"],
                "seatTotal": "string",
                "policyAlternatives": ["string"]
            }
        ],
        "keyRivalries": [
            {
                "parties_or_figures": "string",
                "context": "string"
            }
        ],
        "headOfState": { "name": "string", "party": "string", "since": "string", "approvalRating": "string or null" },
        "headOfGovernment": { "name": "string", "party": "string", "since": "string", "approvalRating": "string or null" },
        "upcomingElections": "string",
        "currentCrises": ["string"]
    },
    "electoralSystem": {
        "systemType": "string",
        "constituencies": "string",
        "electoralThreshold": "string or null",
        "seatAllocationMethod": "string",
        "upperHouseSystem": "string or null",
        "lowerHouseSystem": "string",
        "headOfStateElection": "string",
        "termLengths": "string",
        "termLimits": "string",
        "compulsoryVoting": "string",
        "absenteeVoting": "string",
        "electronicVoting": "string",
        "electoralManagementBody": "string",
        "recentReforms": "string"
    },
    "voterDemographics": {
        "registeredVoters": "string",
        "registrationRate": "string",
        "turnoutTrends": [
            { "election": "string", "turnout": "string" }
        ],
        "youthParticipation": "string",
        "genderGap": "string",
        "urbanRuralPatterns": "string",
        "regionalStrongholds": "string",
        "ethnicOrReligiousBlocs": "string or null",
        "diasporaVoting": "string",
        "voterSuppressionConcerns": "string or null"
    },
    "politicalFamilies": [
        {
            "familyName": "string",
            "regionOfInfluence": "string",
            "generationsInPolitics": "number",
            "members": [
                {
                    "name": "string",
                    "position": "string",
                    "yearsInOffice": "string",
                    "party": "string"
                }
            ],
            "totalOfficesHeld": "number",
            "wealthAndBusiness": "string or null",
            "controversies": "string or null",
            "currentInfluence": "string (dominant/significant/declining/historical)"
        }
    ],
    "campaignFinance": {
        "legalFramework": "string",
        "spendingLimits": "string",
        "donationLimits": "string",
        "publicFunding": "string",
        "majorDonors": "string",
        "disclosureRequirements": "string",
        "enforcementBody": "string",
        "notableScandals": ["string"],
        "darkMoney": "string"
    },
    "civilSociety": {
        "advocacyGroups": [
            { "name": "string", "cause": "string" }
        ],
        "keyNGOs": [
            { "name": "string", "focus": "string" }
        ],
        "mediaOrganizations": [
            { "name": "string", "type": "string", "politicalLeaning": "string" }
        ],
        "thinkTanks": [
            { "name": "string", "focus": "string" }
        ],
        "tradeUnions": ["string"],
        "religiousOrganizations": ["string"],
        "businessAssociations": ["string"],
        "youthOrganizations": ["string"],
        "socialMediaRole": "string"
    },
    "politicalViolenceAssessment": {
        "extremistGroups": [
            { "name": "string", "ideology": "string", "estimatedSize": "string", "threatLevel": "string" }
        ],
        "politicalAssassinations": [
            { "victim": "string", "date": "string", "circumstances": "string" }
        ],
        "politicalPrisoners": "string",
        "electionViolence": "string",
        "terrorism": "string",
        "paramilitaryGroups": ["string"],
        "stateRepression": "string",
        "overallRiskLevel": "string (low/moderate/high/critical)"
    },
    "freedomIndices": {
        "freedomHouse": {
            "score": "number (0-100)",
            "status": "string (Free/Partly Free/Not Free)",
            "politicalRights": "string",
            "civilLiberties": "string",
            "trend": "string"
        },
        "pressFreedomIndex": {
            "rank": "string",
            "score": "string",
            "trend": "string"
        },
        "democracyIndex": {
            "score": "string",
            "rank": "string",
            "category": "string (full democracy/flawed democracy/hybrid regime/authoritarian)",
            "electoralProcess": "string",
            "governmentFunctioning": "string",
            "politicalParticipation": "string",
            "politicalCulture": "string",
            "civilLiberties": "string",
            "trend": "string"
        },
        "corruptionPerceptionsIndex": {
            "rank": "string",
            "score": "string",
            "trend": "string"
        },
        "vDemLiberalDemocracyIndex": "string or null",
        "ruleOfLawIndex": "string or null",
        "humanRightsWatch": "string",
        "amnestyInternational": "string"
    },
    "politicalReforms": {
        "constitutionalAmendments": [
            { "date": "string", "subject": "string", "impact": "string" }
        ],
        "majorLegislativeReforms": [
            { "year": "string", "description": "string", "outcome": "string" }
        ],
        "pendingReforms": ["string"],
        "decentralization": "string",
        "antiCorruption": "string",
        "judicialReforms": "string",
        "electoralLawChanges": "string",
        "civilLibertiesChanges": "string",
        "internationalPressure": "string or null"
    },
    "protestMovements": [
        {
            "name": "string",
            "dates": "string",
            "duration": "string",
            "cause": "string",
            "peakParticipants": "string",
            "keyLeaders": "string or null",
            "governmentResponse": "string",
            "outcome": "string",
            "casualties": "string or null",
            "internationalReaction": "string",
            "legacy": "string"
        }
    ]
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
