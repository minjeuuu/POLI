import { 
    PersonDetail, EventDetail, IdeologyDetail, PoliticalPartyDetail, 
    OrganizationDetail, BookStructure, QuizQuestion, Flashcard,
    DailyContext, DisciplineDetail, PoliticalRecord, ConceptDetail,
    ComparisonResult
} from "../types";

// Helper to clean and extract names from prompts
const extractEntityName = (prompt: string, markers: string[]): string => {
    const p = prompt.toLowerCase();
    for (const marker of markers) {
        const idx = p.indexOf(marker.toLowerCase());
        if (idx !== -1) {
            let raw = prompt.substring(idx + marker.length).trim();
            // strip instruction text
            raw = raw.split(".")[0].split("$")[0].split("\n")[0].replace(/['"“”]/g, "").trim();
            return raw;
        }
    }
    return "Unknown Entity";
};

export const generateMockData = (prompt: string): string => {
    const p = prompt.toLowerCase();

    // 1. DAILY BRIEFING / DAILY CONTEXT
    if (p.includes("daily political context briefing") || p.includes("daily_v")) {
        const mockDaily: DailyContext = {
            date: new Date().toISOString().split('T')[0],
            synthesis: "Global political developments show shifts in regional alliances and renewed focus on economic sovereignty. Trade agreements are being re-negotiated to adjust to supply chain disruptions, while multi-lateral bodies debate carbon tariffs and digital governance regulations.",
            quote: {
                text: "The price of apathy towards public affairs is to be ruled by evil men.",
                author: "Plato",
                year: "c. 380 BCE",
                region: "Athens, Ancient Greece"
            },
            news: [
                {
                    headline: "Global Trade Summit Concludes with Digital Commerce Accord",
                    summary: "Over eighty nations have signed a memorandum establishing unified standards for cross-border digital services, taxation frameworks, and data protection rules.",
                    source: "Global Commerce Review",
                    date: new Date().toISOString().split('T')[0],
                    url: "#"
                },
                {
                    headline: "Regional Climate Consortium Announces Green Investment Fund",
                    summary: "A coalition of nations pledged $200 billion toward green infrastructure development in developing economies over the next decade.",
                    source: "Eco-Policy Monitor",
                    date: new Date().toISOString().split('T')[0],
                    url: "#"
                }
            ],
            highlightedPerson: { category: "Diplomat", title: "Dag Hammarskjöld", subtitle: "Former UN Secretary-General", meta: "Developed the doctrine of preventive diplomacy." },
            highlightedCountry: { category: "Geopolitics", title: "Singapore", subtitle: "Singapore Profile", meta: "High economic freedom coupled with unitary state governance." },
            highlightedIdeology: { category: "Political Theory", title: "Social Democracy", subtitle: "Mixed Economy Model", meta: "Combines capitalist market systems with strong welfare states." },
            highlightedOrg: { category: "International Relations", title: "ASEAN", subtitle: "Southeast Asian Coalition", meta: "Promotes intergovernmental cooperation and economic integration." },
            highlightedDiscipline: { category: "Academic Field", title: "Comparative Politics", subtitle: "System Analysis", meta: "Study of domestic politics, political institutions, and governments across countries." },
            dailyFact: { content: "The oldest continuously functioning democracy is often cited as Iceland's Althing, established in 930 AD.", source: "Icelandic History Bureau", type: "History" },
            dailyTrivia: { content: "Which country has the shortest written constitution? Monaco, with less than 4,000 words.", source: "Constitutional Studies", type: "Law" },
            historicalEvents: [
                { year: "1215", event: "Magna Carta signed", location: "Runnymede, England", description: "King John signs the Great Charter, establishing the principle that everyone, including the king, is subject to the law." }
            ],
            otherHighlights: []
        };
        return JSON.stringify(mockDaily);
    }

    // 2. QUIZ QUESTIONS
    if (p.includes("quiz") || p.includes("question")) {
        const topic = extractEntityName(prompt, ["quiz for", "quiz on", "questions about"]);
        const mockQuiz: QuizQuestion[] = [
            {
                question: `Which core principle is central to the political theory of ${topic}?`,
                options: ["Absolute decentralization of power", "Systematic institutional governance", "Complete abolition of laws", "Unregulated economic commerce"],
                correctAnswer: 1,
                explanation: `Governance frameworks regarding ${topic} prioritize institutional balance and systematic rule representation.`
            },
            {
                question: `Who is historically recognized as a major contributor to concepts related to ${topic}?`,
                options: ["Niccolò Machiavelli", "John Locke", "Karl Marx", "All of the above"],
                correctAnswer: 3,
                explanation: `Many political philosophers have written extensively on theories and structures that touch upon ${topic}.`
            },
            {
                question: `How does ${topic} typically manifest in contemporary policy debates?`,
                options: ["Through constitutional reform", "Through trade regulation", "Through public administration", "All of the above"],
                correctAnswer: 3,
                explanation: `Modern implementations of ${topic} affect multiple areas including constitutionality, trade, and state administration.`
            }
        ];
        return JSON.stringify(mockQuiz);
    }

    // 3. FLASHCARDS
    if (p.includes("flashcard") || p.includes("term")) {
        const topic = extractEntityName(prompt, ["flashcard for", "flashcard on", "terms about"]);
        const mockCards: Flashcard[] = [
            {
                front: `${topic} Sovereignty`,
                back: "The authority of a state or entity to govern itself or assert supreme political authority over a topic. Context: Used in international relations to define boundary rules and political legitimacy."
            },
            {
                front: `Institutional ${topic}`,
                back: "The structural arrangements, rules, and procedures that govern political action in relation to this subject. Context: Analyzed by comparative political scientists to study policy efficiency."
            },
            {
                front: `Social Contract of ${topic}`,
                back: "The implicit agreement between citizens and governing bodies outlining rights and duties concerning this theme. Context: Formed the basis of political legitimacy during the Enlightenment."
            }
        ];
        return JSON.stringify(mockCards);
    }

    // 4. BOOK STRUCTURE / SYLLABUS
    if (p.includes("book structure") || p.includes("syllabus")) {
        const bookTitle = extractEntityName(prompt, ["book structure for", "book:"]);
        const mockBook: BookStructure = {
            title: bookTitle !== "Unknown Entity" ? bookTitle : "Political Philosophy Reader",
            author: "Academic Core",
            chapters: [
                "Chapter 1: Introduction: Scope and Methodology (15 pages) - Defines the terms, key questions, and research designs used to study this field.",
                "Chapter 2: Historical Foundations and Classic Texts (25 pages) - Traces the origin of the subject from classical antiquity to early modern thought.",
                "Chapter 3: Institutional Analysis and State Machinery (30 pages) - Examines how political organizations structure authority and distribute power.",
                "Chapter 4: Contemporary Controversies and Policy Debates (35 pages) - Highlights current arguments, empirical findings, and normative criticisms."
            ]
        };
        return JSON.stringify(mockBook);
    }

    // 5. PERSON DETAIL
    if (p.includes("profile of") || p.includes("person detail") || p.includes("person_v")) {
        const name = extractEntityName(prompt, ["profile of", "person detail for", "person:"]);
        
        // Custom Famous Figures
        if (name.toLowerCase().includes("machiavelli")) {
            const machiavelli: PersonDetail = {
                name: "Niccolò Machiavelli",
                role: "Diplomat, Politician, and Philosopher",
                country: "Republic of Florence (Italy)",
                era: "Renaissance",
                bio: "Niccolò Machiavelli was an Italian diplomat, author, philosopher, and historian who lived during the Renaissance. He is best known for his political treatise 'The Prince' (Il Principe), written in 1513, which argued that the acquisition and maintenance of political power may require actions that are politically necessary, even if morally questionable.",
                ideology: "Political Realism / Republicanism",
                politicalWorks: ["The Prince", "Discourses on Livy", "The Art of War"],
                officesHeld: [{ role: "Second Chancellor of the Republic of Florence", years: "1498-1512" }],
                timeline: [
                    { year: "1469", event: "Born in Florence" },
                    { year: "1498", event: "Elected as Second Chancellor" },
                    { year: "1513", event: "Wrote 'The Prince'" },
                    { year: "1527", event: "Died in Florence" }
                ],
                relatedLinks: [{ title: "Wikipedia: Machiavelli", url: "https://en.wikipedia.org/wiki/Niccol%C3%B2_Machiavelli" }]
            };
            return JSON.stringify(machiavelli);
        }
        
        if (name.toLowerCase().includes("locke")) {
            const locke: PersonDetail = {
                name: "John Locke",
                role: "Philosopher and Physician",
                country: "England",
                era: "Enlightenment",
                bio: "John Locke was an English philosopher and physician, widely regarded as one of the most influential of Enlightenment thinkers and commonly known as the 'Father of Liberalism'. His writings influenced Voltaire, Rousseau, and the American revolutionaries, finding expression in the US Declaration of Independence.",
                ideology: "Classical Liberalism",
                politicalWorks: ["Two Treatises of Government", "An Essay Concerning Human Understanding", "A Letter Concerning Toleration"],
                officesHeld: [{ role: "Secretary to the Board of Trade and Plantations", years: "1673-1675" }],
                timeline: [
                    { year: "1632", event: "Born in Wrington, Somerset" },
                    { year: "1689", event: "Published 'Two Treatises of Government'" },
                    { year: "1704", event: "Died in Essex, England" }
                ],
                relatedLinks: [{ title: "Wikipedia: John Locke", url: "https://en.wikipedia.org/wiki/John_Locke" }]
            };
            return JSON.stringify(locke);
        }

        // Generic Person Fallback
        const mockPerson: PersonDetail = {
            name: name,
            role: "Political Theorist & Statesman",
            country: "International",
            era: "Modern Era",
            bio: `${name} was an influential political figure and writer who contributed significantly to debates on constitutionalism, institutional designs, and administrative rights.`,
            ideology: "Constitutional Governance",
            politicalWorks: ["Treatise on Public Authority", "Essays on Governance and Law"],
            officesHeld: [{ role: "Academic and Legislative Advisor", years: "Various" }],
            timeline: [
                { year: "c. 19th Century", event: "Born in modern nation state" },
                { year: "c. 20th Century", event: "Active academic career and publishing" }
            ],
            relatedLinks: [{ title: "Academic Profile", url: "#" }]
        };
        return JSON.stringify(mockPerson);
    }

    // 6. EVENT DETAIL
    if (p.includes("event dossier") || p.includes("event detail") || p.includes("event_v")) {
        const title = extractEntityName(prompt, ["event dossier:", "event detail for", "event:"]);
        const mockEvent: EventDetail = {
            title: title,
            date: "Historical Epoch",
            location: "Global / Multi-regional",
            context: `The event arose during a period of structural transformations, geopolitical shifts, and changing domestic coalitions.`,
            keyActors: ["State Delegates", "Civil Society Alliances", "Institutional Directors"],
            outcome: "Resulted in treaty re-negotiations, public reforms, and long-term legal amendments.",
            significance: "Established precedent for international cooperation and modern policy frameworks in this domain.",
            imageUrl: "",
            documents: ["Official Treaty Text", "Ratification Memorandum", "Academic Critiques"]
        };
        return JSON.stringify(mockEvent);
    }

    // 7. IDEOLOGY DETAIL
    if (p.includes("political ideology") || p.includes("ideology detail") || p.includes("ideology_v")) {
        const name = extractEntityName(prompt, ["political ideology:", "ideology detail for", "ideology:"]);
        const mockIdeology: IdeologyDetail = {
            name: name,
            definition: `A comprehensive political belief system organized around the principles of ${name}.`,
            origins: "Originated in the philosophical debates of the 17th-19th centuries during major socioeconomic reforms.",
            historyNarrative: "Developed through historical struggles for representation, economic redistribution, and institutional reforms.",
            timeline: [
                { year: "1789", event: "French Revolution", impact: "Catalyzed modern ideological divisions." }
            ],
            branches: ["Classical Form", "Reformist Variant", "Radical Adaptation"],
            coreTenets: [
                { concept: "Institutional Accountability", description: "Legal constraints on government power." },
                { concept: "Individual Rights", description: "Protection of civil liberties." }
            ],
            keyThinkers: [
                { name: "Classical Authors", era: "18th Century", contribution: "Laid philosophical foundations." },
                { name: "Modern System Analysts", era: "20th Century", contribution: "Analyzed democratic institutions." }
            ],
            globalImpact: "Continues to serve as a foundational paradigm in constitutional designs and political party manifestos.",
            criticisms: "Critiqued by opposing theorists for over-relying on institutional structures or failing to address structural market inequities.",
            foundationalWorks: [
                { title: "Treatise on Ideological Foundations", author: "Classic Theorist", year: "1850" }
            ]
        };
        return JSON.stringify(mockIdeology);
    }

    // 8. ORGANIZATION DETAIL
    if (p.includes("organization detail") || p.includes("org:") || p.includes("org_v")) {
        const name = extractEntityName(prompt, ["organization detail:", "org:", "organization:"]);
        const mockOrg: OrganizationDetail = {
            name: name,
            type: "Intergovernmental / Non-governmental",
            headquarters: "International Neutral Zone",
            founded: "Post-War Era",
            secretaryGeneral: "Neutral Executive",
            mission: "To coordinate policy, resolve disputes peacefully, and establish standards of international law.",
            members: ["Global State Delegations", { name: "Observer A", role: "State Delegate", isoCode: "OB" }],
            history: "Established by multilateral charter following global conflicts to secure diplomatic channels.",
            keyOrgans: [
                { name: "General Assembly", function: "Plenary discussions and voting on resolutions." },
                { name: "Executive Secretariat", function: "Day-to-day administrative operations." }
            ],
            majorTreaties: ["Multilateral Founding Accord", "Digital Protocol Agreement"]
        };
        return JSON.stringify(mockOrg);
    }

    // 9. POLITICAL RECORD
    if (p.includes("political record") || p.includes("record_v")) {
        const name = extractEntityName(prompt, ["political record for", "record:"]);
        const mockRecord: PoliticalRecord = {
            entity: {
                id: "mock_record",
                name: name,
                officialName: `The Institutional Record of ${name}`,
                type: "Institution",
                jurisdiction: "International / Sovereign State",
                establishedDate: "Historical Era",
                status: "Active / Reference Standard",
                description: `Socio-political profile and history of ${name}, covering its governance structures, historical milestones, and legal developments.`
            },
            historicalContext: `Developed in response to administrative challenges, constitutional negotiations, and public demands during institutional reforms.`,
            timeline: [
                {
                    id: "t1",
                    date: "Phase 1",
                    title: "Establishment Charter",
                    type: "Founding",
                    description: "Formalization of principles, objectives, and administrative bylaws.",
                    outcome: "Began operations and received state credentials.",
                    citations: [{ id: "c1", source: "Official Gazette", year: 1945, authorOrBody: "Constituent Assembly" }]
                },
                {
                    id: "t2",
                    date: "Phase 2",
                    title: "Administrative Expansion",
                    type: "Reform",
                    description: "Enlargement of delegation scopes and codification of regulatory practices.",
                    outcome: "Increased membership and standardized voting structures.",
                    citations: [{ id: "c2", source: "Institutional Journal", year: 1972, authorOrBody: "Executive Council" }]
                }
            ],
            relatedDisciplines: ["Comparative Politics", "Public Administration", "Constitutional Law"],
            primarySources: [
                { id: "s1", source: "Founding Declaration", year: 1945, authorOrBody: "Plenary Delegates" },
                { id: "s2", source: "Sovereign Ratification Documents", year: 1946, authorOrBody: "Sovereign Parliaments" }
            ]
        };
        return JSON.stringify(mockRecord);
    }

    // 10. DISCIPLINE DETAIL
    if (p.includes("discipline detail") || p.includes("discipline_v")) {
        const name = extractEntityName(prompt, ["discipline detail for", "discipline:"]);
        const mockDiscipline: DisciplineDetail = {
            name: name,
            overview: {
                definition: `The structured study of ${name}, focusing on empirical analysis, normative frameworks, and research methodologies related to this field.`,
                scope: "Examines state systems, local councils, global networks, and civic representation.",
                importance: "Provides analytical tools to optimize governance efficiency and policy equity.",
                keyQuestions: ["How is authority established?", "How are resources distributed?", "How is civic consent obtained?"]
            },
            historyNarrative: "Emerged from classical philosophy, expanding rapidly during the 20th century with the adoption of empirical and quantitative research designs.",
            subDisciplines: ["Behavioral Analysis", "Institutional Design", "Quantitative Modeling", "Normative Theory"],
            coreTheories: [
                { name: "Rational Choice Theory", year: "1950s", summary: "Models political actors as self-interested agents maximizing utility." },
                { name: "Historical Institutionalism", year: "1980s", summary: "Stresses the role of path dependency and historical rules." }
            ]
        };
        return JSON.stringify(mockDiscipline);
    }

    // 11. CONCEPT DETAIL
    if (p.includes("concept detail") || p.includes("concept_v")) {
        const name = extractEntityName(prompt, ["concept detail:", "concept:", "term:"]);
        const mockConcept: ConceptDetail = {
            term: name,
            definition: `A political science framework defining the interactions, rules, and power dynamics associated with ${name}.`,
            context: "First conceptualized in seminal papers during the mid-20th century to analyze systemic governance behaviours, with debates concerning operationalization and applicability.",
            examples: ["Applied Administrative Codes", "State Regulatory Frameworks"],
            history: "Evolved through academic debates and empirical tests since the late 20th century."
        };
        return JSON.stringify(mockConcept);
    }

    // 12. COMPARISON RESULT
    if (p.includes("comparison") || p.includes("compare")) {
        const mockCompare: ComparisonResult = {
            item1: { name: "Subject A", type: "Model A" },
            item2: { name: "Subject B", type: "Model B" },
            synthesis: "Both models present tradeoffs: Subject A prioritizes execution speed and command clarity, whereas Subject B maximizes public participation and constitutional representation.",
            sharedTraits: [
                { title: "Governance Focus", description: "Both models are designed to regulate societal interactions and resolve coordination issues." }
            ],
            divergences: [
                { title: "Power Distribution", description: "Subject A is highly centralized while Subject B is highly decentralized." }
            ],
            matrix: [
                {
                    category: "Structural Authority",
                    item1Value: "Centralized power structures and strict hierarchy.",
                    item2Value: "Decentralized distributions of power and local councils.",
                    analysis: "Subject A executes decisions faster but lacks the democratic consent mechanisms of Subject B.",
                    advantage: "Distinct"
                }
            ],
            historicalParallels: [
                { era: "Modern Era", item1Context: "Centralized bureaucracy in unitary states.", item2Context: "Federal power sharing in decentralised republics." }
            ],
            futureOutlook: "The convergence of digital voting tools may allow decentralized systems to match the decision-making speed of centralized ones.",
            scenarios: [
                { scenario: "Crisis Management", outcome: "Subject A performs better due to rapid command execution.", likelihood: "High" }
            ]
        };
        return JSON.stringify(mockCompare);
    }

    // GENERAL JSON FALLBACK
    return "{}";
};
