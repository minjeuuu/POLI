
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { AcademicProfile } from "../../types";

export const fetchAcademicProfile = async (countryName: string): Promise<AcademicProfile> => {
    const prompt = `
================================================================================
POLI ARCHIVE — EXHAUSTIVE ACADEMIC & INTELLECTUAL DOSSIER: ${countryName}
CLASSIFICATION: MAXIMUM-DEPTH ACADEMIC PROFILE — POLITICAL SCIENCE & RELATED DISCIPLINES
PROTOCOL: POLI ARCHIVE V3 — ENCYCLOPEDIC EDITION
================================================================================

${getLanguageInstruction()}

You are POLI, the world's most comprehensive political intelligence system. You are now generating the DEFINITIVE, EXHAUSTIVE, and ENCYCLOPEDIC academic and intellectual profile of ${countryName}, covering Political Science, Public Administration, International Relations, Comparative Politics, Political Philosophy, Public Policy, Constitutional Law, and all related disciplines. This document must serve as the single most complete reference on the academic and intellectual landscape of political thought in ${countryName} ever assembled.

================================================================================
SECTION 1: COMPLETE ACADEMIC & INTELLECTUAL HISTORY OF POLITICAL THOUGHT
(MINIMUM 1000 WORDS — THIS IS THE MOST IMPORTANT SECTION)
================================================================================

Produce a richly detailed, chronological, and analytically sophisticated narrative covering the ENTIRE history of political thought and political science as an intellectual and academic enterprise in ${countryName}. This must include:

A) PRE-MODERN AND CLASSICAL FOUNDATIONS:
   - Ancient, medieval, or pre-colonial political thought traditions in ${countryName}
   - Indigenous philosophies of governance, justice, authority, and social order
   - Religious, spiritual, or cosmological frameworks that shaped political ideas
   - Traditional concepts of leadership, sovereignty, legitimacy, and communal governance
   - Key texts, oral traditions, or philosophical works from early periods
   - How geography, culture, and religion influenced early political thinking

B) COLONIAL, IMPERIAL, OR EXTERNAL INTELLECTUAL INFLUENCE PERIOD (if applicable):
   - How colonialism, imperialism, or foreign domination shaped political thought
   - Introduction of Western/foreign political concepts and institutions
   - Intellectual resistance movements and anti-colonial political philosophy
   - Key thinkers who synthesized indigenous and foreign political traditions
   - The role of missionary education, colonial universities, or foreign-trained intellectuals

C) MODERN NATION-BUILDING AND THE FORMALIZATION OF POLITICAL SCIENCE:
   - When political science was first taught as a formal academic discipline in ${countryName}
   - The first universities or institutions to offer political science programs
   - Founding figures of the discipline in ${countryName} — their biographies, training, publications, and intellectual orientations
   - How the discipline differentiated itself from law, philosophy, history, and economics
   - Early curricula: what was taught, which foreign models were adopted or adapted
   - The role of returning scholars trained abroad (PhD holders from the US, UK, France, Germany, etc.)

D) MID-20TH CENTURY EVOLUTION:
   - How political upheavals (wars, revolutions, coups, independence movements, Cold War dynamics) affected the discipline
   - The behavioralist revolution and its impact on ${countryName}'s political science
   - Institutionalization: creation of professional associations, journals, and conferences
   - Government demand for political expertise and policy analysis
   - The development of subfields: comparative politics, IR, public administration, political economy, political sociology

E) LATE 20TH CENTURY AND CONTEMPORARY PERIOD:
   - The impact of democratization, globalization, and neoliberalism on the discipline
   - The rise of rational choice, new institutionalism, constructivism, and other paradigms
   - Gender, postcolonial, and critical theory entering the mainstream
   - Quantitative vs. qualitative methods debates in ${countryName}'s political science
   - The digital transformation: computational political science, big data, and social media analysis
   - Current state of the discipline: number of departments, PhD programs, annual graduates, research output

F) RELATIONSHIP BETWEEN ACADEMIA AND GOVERNMENT/POLICY:
   - How academic political scientists have influenced government policy in ${countryName}
   - The revolving door between universities and government: scholars who became ministers, advisors, or officials
   - Government funding of political science research
   - Tensions between academic freedom and political pressure
   - Think tanks as intermediaries between academia and policy
   - Academic involvement in constitution-drafting, electoral reform, and institutional design
   - Public intellectuals: political scientists who shape public debate through media, columns, and public engagement
   - The role of political science in training civil servants and diplomats

================================================================================
SECTION 2: MAJOR POLITICAL SCIENCE SCHOLARS AND THINKERS
(MINIMUM 15 SCHOLARS)
================================================================================

Provide detailed profiles of the most important political science scholars, political philosophers, and public intellectuals from ${countryName}, both historical and contemporary. For EACH scholar:

- Full name, birth/death years, place of birth
- Educational background (where they studied, degrees, mentors)
- Institutional affiliations (universities, research centers, government positions)
- Core intellectual contributions: what theories, concepts, or frameworks they developed
- Major publications (titles, years, publishers)
- Their school of thought or methodological orientation
- Awards, honors, and international recognition
- Their influence on subsequent generations of scholars
- International connections and collaborations
- Their role in public life (if any): advising governments, media presence, activism

Include scholars from ALL periods — founding figures, mid-century giants, and contemporary leaders. Include scholars working in: political theory, comparative politics, international relations, public administration, public policy, political economy, political sociology, constitutional law/politics, and area studies.

================================================================================
SECTION 3: KEY POLITICAL SCIENCE DEPARTMENTS AT UNIVERSITIES
(MINIMUM 20 INSTITUTIONS IF AVAILABLE)
================================================================================

List ALL universities in ${countryName} with significant Political Science, Government, Public Administration, International Relations, or related departments/programs. For EACH institution:

- Full official name of the university
- Common acronym or abbreviation
- City and region/state/province
- Type: Public / Private / State / Military / Religious-affiliated
- Year the university was founded
- Year the political science department/program was established (if different)
- Official website URL (must be a real, verified URL)
- Logo description: colors, symbols, motto, heraldic elements
- Department or school name (e.g., "Department of Political Science," "School of Government," "Faculty of Social Sciences")
- Degree programs offered: BA, MA, MPA, PhD, professional certificates
- Number of faculty (approximate)
- Notable current and emeritus faculty members (names and specializations)
- Notable alumni who entered politics, government, diplomacy, or public life
- Research specializations and strengths (e.g., democratic transitions, security studies, public policy analysis)
- Key research centers or institutes housed within the department
- International partnerships and exchange programs
- Rankings or recognition (national and international)
- Student enrollment in political science programs (approximate)

SPECIAL ORDERING INSTRUCTIONS:
- If ${countryName} is "Philippines": Saint Louis University (SLU) in Baguio City MUST be listed FIRST. Include its CICM (Congregatio Immaculati Cordis Mariae) heritage, its history since 1911, the School of Accountancy, Business and Hospitality, and all political science and public administration programs. Then list University of the Philippines, Ateneo de Manila, De La Salle, and ALL others.
- Include regional and provincial universities, not just elite institutions.
- Include military academies and diplomatic training institutes if they offer political science coursework.

================================================================================
SECTION 4: ACADEMIC JOURNALS PUBLISHED IN ${countryName}
(ALL KNOWN JOURNALS)
================================================================================

List ALL academic journals in political science, public administration, international relations, governance, and related fields that are published in ${countryName}. For EACH journal:

- Full journal title
- Publisher (university press, professional association, independent publisher)
- ISSN (print and/or online)
- Frequency of publication (quarterly, biannual, annual)
- Year founded
- Current editor-in-chief (if known)
- Focus areas and scope
- Indexing: which databases index the journal (Scopus, Web of Science, JSTOR, etc.)
- Impact factor or citation metrics (if available)
- Open access status
- Notable articles or special issues
- Language(s) of publication
- Website URL

Also mention if scholars from ${countryName} frequently publish in major international journals (APSR, AJPS, World Politics, Comparative Politics, Journal of Democracy, etc.) and which subfields they contribute to most.

================================================================================
SECTION 5: RESEARCH CENTERS AND THINK TANKS
(ALL MAJOR INSTITUTIONS)
================================================================================

List ALL significant think tanks, policy research institutes, research centers, and intellectual organizations focused on politics, governance, public policy, security, international relations, and related topics in ${countryName}. For EACH:

- Full official name
- Common acronym
- City/location and physical address
- Year founded
- Founder(s) and founding circumstances
- Official website URL (real, verified)
- Logo description (colors, symbols, design elements)
- Mission statement or organizational purpose
- Focus areas and research programs
- Political orientation or ideological leaning (if any): left, center-left, centrist, center-right, right, libertarian, nonpartisan
- Funding sources: government, private donors, international foundations, membership
- Key current and past researchers/fellows (names and specializations)
- Major publications: flagship reports, book series, working paper series, policy briefs
- Annual events or conferences they organize
- Influence on government policy: documented instances of policy impact
- International affiliations and partnerships
- Staff size (approximate)
- Annual budget (approximate, if known)

SPECIAL INSTRUCTIONS:
- If ${countryName} is "Philippines": Philippine Political Science Association (PPSA) MUST be listed FIRST with complete details. Also include: Development Academy of the Philippines (DAP), Philippine Institute for Development Studies (PIDS), Institute for Strategic and Development Studies (ISDS), Ateneo Policy Center, UP Third World Studies Center, and ALL others.
- Distinguish between university-affiliated research centers and independent think tanks.
- Include both domestic and internationally-funded organizations operating in ${countryName}.

================================================================================
SECTION 6: MAJOR POLITICAL SCIENCE CONFERENCES
================================================================================

List ALL significant recurring academic conferences, symposia, workshops, and intellectual gatherings focused on political science and related disciplines that are held in ${countryName}. For EACH:

- Full name of the conference
- Organizing institution or association
- Frequency (annual, biennial, etc.)
- Typical month/season when held
- Typical location/venue
- Year the conference was first held
- Average number of participants
- Key themes or tracks
- Whether international scholars participate
- Notable past keynote speakers
- Whether proceedings are published
- Website or contact information

Also describe any major international political science conferences that have been hosted in ${countryName} (e.g., IPSA World Congress, regional association meetings, thematic conferences).

================================================================================
SECTION 7: INTELLECTUAL TRADITIONS AND SCHOOLS OF THOUGHT
(MINIMUM 600 WORDS)
================================================================================

Provide a detailed analytical essay on the distinctive intellectual traditions, paradigms, and schools of thought that characterize political science and political thinking in ${countryName}. Address:

- What are the dominant theoretical frameworks used by political scientists in ${countryName}?
- Are there uniquely local or regional schools of thought? (e.g., dependency theory in Latin America, Ubuntu philosophy in Africa, Asian values debate)
- How has Marxism, liberalism, conservatism, nationalism, populism, feminism, postcolonialism, and other ideological traditions manifested in ${countryName}'s political thought?
- What is the balance between normative political theory and empirical political science?
- How do political scientists in ${countryName} approach the study of their own country vs. comparative/international topics?
- Are there methodological preferences? (e.g., case study tradition, survey research, formal modeling, ethnography, historical institutionalism)
- How has the intellectual tradition of ${countryName} been received internationally? Which ideas have been exported?
- Key intellectual debates that have defined generations of scholars
- The role of public intellectuals in shaping political discourse
- How religious thought, ethnic identity, and cultural values intersect with political science

================================================================================
SECTION 8: KEY ACADEMIC DEBATES IN THE COUNTRY'S POLITICAL SCIENCE
================================================================================

Identify and describe the most important academic debates, controversies, and intellectual fault lines within ${countryName}'s political science community. For EACH debate:

- The core question or disagreement
- The main positions and their leading proponents
- Key publications that defined the debate
- How the debate evolved over time
- Whether the debate was resolved or remains ongoing
- The debate's impact on the discipline and on policy
- International parallels or connections

Include debates about: regime type and democratization, state-building, nationalism and identity, economic development models, constitutional design, electoral systems, federalism vs. unitarism, civil-military relations, corruption and governance, human rights, foreign policy orientation, and any other topics specific to ${countryName}.

================================================================================
SECTION 9: BIBLIOGRAPHY OF ESSENTIAL WORKS
(MINIMUM 20 WORKS — AIM FOR 30+)
================================================================================

Compile a comprehensive bibliography of the most essential, influential, and widely cited academic works about the politics of ${countryName}. Include books, monographs, edited volumes, and seminal journal articles. For EACH work:

- Full title
- Author(s) or editor(s), with their institutional affiliation at time of publication
- Year of publication
- Publisher (for books) or journal name and volume/issue (for articles)
- A 2-3 sentence description of the work's argument, contribution, and significance
- Number of citations or indication of influence (if known)
- Whether the work is considered a "classic" or "must-read" in the field

Organize the bibliography thematically:
   a) General overviews and country studies
   b) Political history and regime change
   c) Political institutions (executive, legislative, judicial, bureaucracy)
   d) Elections, parties, and political behavior
   e) Political economy and development
   f) International relations and foreign policy
   g) Political culture, identity, and society
   h) Constitutional law and legal politics
   i) Security, conflict, and peace studies
   j) Political theory and philosophy from/about ${countryName}

Include works by BOTH domestic scholars and international scholars who study ${countryName}.

================================================================================
SECTION 10: INTERNATIONAL ACADEMIC CONNECTIONS AND COLLABORATIONS
================================================================================

Describe the international dimension of ${countryName}'s political science community:

- Which foreign countries have the strongest academic ties with ${countryName} in political science?
- Major international exchange programs and partnerships
- Where do ${countryName}'s political science PhD students go for training abroad?
- Which international scholars have made major contributions to studying ${countryName}?
- International research projects and consortia involving scholars from ${countryName}
- Diaspora scholars: academics from ${countryName} working at foreign universities and their contributions
- Foreign scholars based in ${countryName} and their role in the local academic community
- International funding agencies that support political science research in ${countryName}
- Regional academic networks (e.g., ASEAN, African, European, Latin American networks)
- Participation in international professional associations (IPSA, APSA, ECPR, ISA, etc.)

================================================================================
SECTION 11: POLITICAL SCIENCE CURRICULUM OVERVIEW
================================================================================

Describe the typical structure and content of political science education in ${countryName}:

- Undergraduate curriculum: core courses, electives, capstone requirements
- Master's programs: MA vs. MPA vs. specialized degrees, thesis vs. coursework tracks
- PhD programs: structure, comprehensive exams, dissertation requirements, average completion time
- Teaching methods: lecture-based, seminar-style, simulation, fieldwork, internships
- Required readings and canonical texts used in courses
- Language of instruction
- How the curriculum compares to international standards (especially US, UK, European models)
- Professional development: bar exams, civil service exams, or other professional qualifications related to political science
- Online and distance learning options
- Continuing education and executive programs for working professionals

================================================================================
SECTION 12: THE FUTURE OF POLITICAL SCIENCE IN ${countryName}
================================================================================

Provide an informed assessment of emerging trends, challenges, and opportunities:

- Emerging research areas and new subfields gaining traction
- Impact of AI, big data, and digital tools on political science research
- Challenges: funding cuts, brain drain, political interference, declining enrollment (if applicable)
- Opportunities: growing demand for policy expertise, new data sources, interdisciplinary collaboration
- Young and emerging scholars to watch
- Institutional reforms and new programs being developed

================================================================================
OUTPUT FORMAT — RETURN VALID JSON ONLY — NO MARKDOWN, NO COMMENTARY
================================================================================

{
    "disciplineHistory": "string — MINIMUM 1000 words. The complete, chronological, analytically rich narrative of how political science developed as a discipline in ${countryName}, from pre-modern roots to the present day. Cover ALL sub-sections from Section 1 above (A through F). This must read like a chapter from an academic handbook.",

    "intellectualHistory": "string — MINIMUM 600 words. The broader intellectual history of political thought in ${countryName}, including indigenous traditions, foreign influences, ideological movements, and how ideas about politics evolved across centuries.",

    "intellectualTraditions": "string — MINIMUM 600 words. Detailed essay on the distinctive schools of thought, paradigms, methodological preferences, and theoretical orientations that characterize political science in ${countryName}. Cover ALL points from Section 7.",

    "academiaGovernmentRelationship": "string — MINIMUM 400 words. Detailed analysis of how academia and government interact in ${countryName}: the revolving door, policy influence, funding dynamics, tensions, and the role of public intellectuals.",

    "keyDebates": [
        {
            "topic": "string — the core question or theme",
            "description": "string — detailed description of the debate, positions, key proponents, publications, evolution, and current status (minimum 150 words each)",
            "keyProponents": ["string — names of leading scholars on each side"],
            "keyPublications": ["string — titles of defining works"],
            "status": "string — resolved / ongoing / evolved",
            "policyImpact": "string — how the debate influenced real policy"
        }
    ],

    "scholars": [
        {
            "name": "string — full name",
            "birthYear": "string",
            "deathYear": "string or null if living",
            "education": "string — degrees and institutions",
            "affiliations": ["string — universities and organizations"],
            "field": "string — primary subfield",
            "contributions": "string — detailed description of intellectual contributions (minimum 100 words)",
            "majorWorks": ["string — titles with year"],
            "awards": ["string"],
            "internationalConnections": "string — collaborations, foreign positions, etc."
        }
    ],

    "universities": [
        {
            "name": "string — full official name",
            "acronym": "string",
            "city": "string",
            "region": "string — state/province/region",
            "type": "string — Public/Private/State/Military/Religious",
            "founded": "string — year university was founded",
            "polsciEstablished": "string — year political science program began",
            "website": "string — real, verified URL",
            "logoDescription": "string — describe logo: colors, symbols, motto, heraldic elements",
            "departmentName": "string — official name of the political science department or school",
            "degreesOffered": ["string — BA, MA, MPA, PhD, etc."],
            "facultyCount": "string — approximate number",
            "notableFaculty": ["string — name and specialization"],
            "notableAlumni": ["string — name and role/position"],
            "specializations": ["string — research strengths"],
            "researchCenters": ["string — centers housed in the department"],
            "internationalPartners": ["string — partner universities"],
            "rankings": "string — national and international rankings",
            "studentEnrollment": "string — approximate political science enrollment"
        }
    ],

    "thinkTanks": [
        {
            "name": "string — full official name",
            "acronym": "string",
            "city": "string",
            "founded": "string — year",
            "founder": "string",
            "website": "string — real, verified URL",
            "logoDescription": "string — colors, symbols, design",
            "mission": "string — organizational purpose",
            "focusAreas": ["string"],
            "orientation": "string — political leaning or nonpartisan",
            "funding": "string — funding sources",
            "keyPublications": ["string — flagship reports and series"],
            "notableResearchers": ["string — name and specialization"],
            "policyInfluence": "string — documented instances of policy impact",
            "internationalAffiliations": ["string"],
            "staffSize": "string — approximate",
            "annualEvents": ["string — conferences or forums they organize"]
        }
    ],

    "journals": [
        {
            "name": "string — full journal title",
            "publisher": "string",
            "issn": "string",
            "frequency": "string — quarterly, biannual, annual",
            "founded": "string — year",
            "editor": "string — current editor-in-chief if known",
            "focusAreas": ["string"],
            "indexing": ["string — Scopus, WoS, JSTOR, etc."],
            "impactFactor": "string — if available",
            "openAccess": "string — yes/no/hybrid",
            "language": "string — language(s) of publication",
            "website": "string — journal URL",
            "notableArticles": ["string — significant published articles"]
        }
    ],

    "researchCenters": [
        {
            "name": "string",
            "affiliation": "string — university or independent",
            "city": "string",
            "founded": "string",
            "focus": "string — research areas",
            "website": "string",
            "director": "string — current director if known",
            "keyProjects": ["string — major research projects"],
            "publications": ["string — working paper series, reports"]
        }
    ],

    "conferences": [
        {
            "name": "string — full conference name",
            "organizer": "string",
            "frequency": "string — annual, biennial, etc.",
            "typicalMonth": "string",
            "location": "string",
            "firstHeld": "string — year",
            "averageParticipants": "string",
            "themes": ["string — key tracks or themes"],
            "international": "string — yes/no and description",
            "proceedingsPublished": "string — yes/no",
            "description": "string — detailed description of the conference"
        }
    ],

    "seminalWorks": [
        {
            "title": "string — full title",
            "author": "string — author(s) with affiliation",
            "year": "string",
            "publisher": "string — publisher or journal name",
            "category": "string — one of: General Overview, Political History, Institutions, Elections & Parties, Political Economy, International Relations, Political Culture, Constitutional Law, Security Studies, Political Theory",
            "significance": "string — 2-3 sentences on argument, contribution, and importance (minimum 50 words)",
            "citations": "string — approximate citation count or influence indicator",
            "classic": "string — yes/no — whether considered a must-read classic"
        }
    ],

    "internationalConnections": {
        "strongestTies": ["string — countries with closest academic ties in political science"],
        "exchangePrograms": ["string — major exchange and fellowship programs"],
        "phdDestinations": ["string — where students go for doctoral training abroad"],
        "internationalScholars": ["string — foreign scholars who study ${countryName}'s politics"],
        "diasporaScholars": ["string — academics from ${countryName} at foreign universities"],
        "internationalFunding": ["string — foreign funding agencies supporting research"],
        "regionalNetworks": ["string — regional academic networks and associations"],
        "professionalAssociations": ["string — international associations where ${countryName}'s scholars participate"]
    },

    "curriculumOverview": {
        "undergraduate": "string — detailed description of typical BA/BS political science curriculum",
        "masters": "string — detailed description of MA/MPA programs",
        "doctoral": "string — detailed description of PhD program structure and requirements",
        "teachingMethods": "string — pedagogical approaches used",
        "canonicalTexts": ["string — standard textbooks and readings used in courses"],
        "languageOfInstruction": "string",
        "professionalQualifications": "string — related exams and certifications",
        "onlineLearning": "string — distance and online options available",
        "executiveEducation": "string — programs for working professionals"
    },

    "futureTrends": {
        "emergingAreas": ["string — new research areas gaining traction"],
        "digitalTransformation": "string — impact of AI, big data, digital methods",
        "challenges": ["string — funding, brain drain, political interference, etc."],
        "opportunities": ["string — new possibilities and growth areas"],
        "emergingScholars": ["string — young scholars to watch"],
        "institutionalReforms": ["string — new programs and structural changes"]
    },

    "politicalScienceHistory": "string — A condensed 300-word summary of the entire academic profile suitable for quick reference. Summarize the discipline's history, key figures, major institutions, and current state."
}

================================================================================
CRITICAL INSTRUCTIONS — READ CAREFULLY:
================================================================================

1. RETURN ONLY THE JSON OBJECT. No markdown code blocks, no explanatory text, no preamble.
2. Every string field must contain SUBSTANTIVE, DETAILED content. No placeholders, no "N/A", no empty strings.
3. The "disciplineHistory" field MUST be at minimum 1000 words of continuous, well-structured prose.
4. The "intellectualHistory" field MUST be at minimum 600 words.
5. The "intellectualTraditions" field MUST be at minimum 600 words.
6. The "seminalWorks" array MUST contain at minimum 20 entries, ideally 30+.
7. The "scholars" array MUST contain at minimum 15 entries.
8. The "universities" array MUST contain at minimum 20 entries (if ${countryName} has that many institutions).
9. ALL URLs must be real, verified, and functional. Do NOT fabricate URLs.
10. ALL scholar names, publication titles, and institutional names must be REAL and ACCURATE. Do NOT fabricate names or works.
11. For the Philippines: SLU Baguio FIRST in universities, PPSA FIRST in think tanks.
12. Cover ALL time periods: pre-modern, colonial, modern, contemporary.
13. Include BOTH domestic and international perspectives on ${countryName}'s political science.
14. This is the DEFINITIVE reference document. Make it worthy of that standard.
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {}) as AcademicProfile;
};
