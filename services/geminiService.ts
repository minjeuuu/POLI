
import { Type, ThinkingLevel, Modality } from "@google/genai";
import {
  PoliticalRecord,
  DailyContext,
  DisciplineDetail,
  RegionalDetail,
  OrganizationDetail,
  PoliticalPartyDetail,
  PersonDetail,
  EventDetail,
  IdeologyDetail,
  ConceptDetail,
  BookStructure,
  Flashcard,
  QuizQuestion,
  ComparisonResult,
  ExchangeRate,
  HighlightDetail,
  HighlightedEntity
} from "../types";
import { FALLBACK_DAILY_CONTEXT, FALLBACK_DISCIPLINE_DETAIL } from "../data/homeData";
import { setAppLanguage, getLanguageInstruction, cleanJson, safeParse, withCache, generateWithRetry, ai } from "./common";

// --- API Functions ---

export const fetchPoliticalRecord = async (query: string): Promise<PoliticalRecord | null> => {
    return withCache(`record_v3_${query}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Generate a structured political record for "${query}".
                If it is a Country, Person, Ideology, or Event, provide details.
                ${getLanguageInstruction()}`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            entity: {
                                type: Type.OBJECT,
                                properties: {
                                    id: {type: Type.STRING},
                                    name: {type: Type.STRING},
                                    officialName: {type: Type.STRING},
                                    type: {type: Type.STRING, enum: ['Country', 'Organization', 'Institution', 'Treaty', 'Person', 'Ideology', 'Event']},
                                    jurisdiction: {type: Type.STRING},
                                    establishedDate: {type: Type.STRING},
                                    status: {type: Type.STRING},
                                    description: {type: Type.STRING},
                                }
                            },
                            historicalContext: {type: Type.STRING},
                            timeline: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        id: {type: Type.STRING},
                                        date: {type: Type.STRING},
                                        title: {type: Type.STRING},
                                        type: {type: Type.STRING},
                                        description: {type: Type.STRING},
                                        outcome: {type: Type.STRING},
                                        citations: {
                                            type: Type.ARRAY, 
                                            items: {
                                                type: Type.OBJECT, 
                                                properties: {
                                                    id:{type:Type.STRING}, 
                                                    source:{type:Type.STRING}, 
                                                    year:{type:Type.INTEGER}, 
                                                    authorOrBody:{type:Type.STRING}
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            relatedDisciplines: {type: Type.ARRAY, items: {type: Type.STRING}},
                            primarySources: {
                                type: Type.ARRAY, 
                                items: {
                                    type: Type.OBJECT, 
                                    properties: {
                                        id:{type:Type.STRING}, 
                                        source:{type:Type.STRING}, 
                                        year:{type:Type.INTEGER}, 
                                        authorOrBody:{type:Type.STRING}
                                    }
                                }
                            }
                        }
                    }
                }
            });
            return safeParse(response.text || '{}', null) as PoliticalRecord;
        } catch (e) {
            console.error(e);
            return null;
        }
    });
};

export const fetchDailyContext = async (date: Date): Promise<DailyContext> => {
    return withCache(`daily_v16_schema_${date.toDateString()}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Generate a daily political context briefing for ${date.toDateString()}.
                Include a quote, a few news items, highlights for person, country, ideology, org, discipline.
                Fact, Trivia, Historical Events.
                ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            synthesis: { type: Type.STRING },
                            quote: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING },
                                    author: { type: Type.STRING },
                                    year: { type: Type.STRING },
                                    region: { type: Type.STRING }
                                }
                            },
                            news: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        headline: { type: Type.STRING },
                                        summary: { type: Type.STRING },
                                        sources: {
                                            type: Type.ARRAY,
                                            items: {
                                                type: Type.OBJECT,
                                                properties: {
                                                    title: { type: Type.STRING },
                                                    uri: { type: Type.STRING }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            highlightedPerson: { type: Type.OBJECT, properties: { category: {type: Type.STRING}, title: {type: Type.STRING}, subtitle: {type: Type.STRING}, meta: {type: Type.STRING} } },
                            highlightedCountry: { type: Type.OBJECT, properties: { category: {type: Type.STRING}, title: {type: Type.STRING}, subtitle: {type: Type.STRING}, meta: {type: Type.STRING} } },
                            highlightedIdeology: { type: Type.OBJECT, properties: { category: {type: Type.STRING}, title: {type: Type.STRING}, subtitle: {type: Type.STRING}, meta: {type: Type.STRING} } },
                            highlightedDiscipline: { type: Type.OBJECT, properties: { category: {type: Type.STRING}, title: {type: Type.STRING}, subtitle: {type: Type.STRING}, meta: {type: Type.STRING} } },
                            highlightedOrg: { type: Type.OBJECT, properties: { category: {type: Type.STRING}, title: {type: Type.STRING}, subtitle: {type: Type.STRING}, meta: {type: Type.STRING} } },
                            dailyFact: { type: Type.OBJECT, properties: { content: {type: Type.STRING}, source: {type: Type.STRING}, type: {type: Type.STRING} } },
                            dailyTrivia: { type: Type.OBJECT, properties: { content: {type: Type.STRING}, source: {type: Type.STRING}, type: {type: Type.STRING} } },
                            historicalEvents: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        year: { type: Type.STRING },
                                        event: { type: Type.STRING },
                                        location: { type: Type.STRING },
                                        description: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            const data = safeParse(response.text || '{}', FALLBACK_DAILY_CONTEXT);
            return { ...FALLBACK_DAILY_CONTEXT, ...data, date: date.toDateString() };
        } catch (e) {
            console.error(e);
            return FALLBACK_DAILY_CONTEXT;
        }
    });
};

export const fetchDisciplineDetail = async (name: string): Promise<DisciplineDetail> => {
     return withCache(`discipline_v4_schema_${name}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Detailed academic overview of the political science discipline: ${name}.
                ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            overview: { 
                                type: Type.OBJECT, 
                                properties: { 
                                    definition: { type: Type.STRING }, 
                                    scope: { type: Type.STRING }, 
                                    importance: { type: Type.STRING }, 
                                    keyQuestions: { type: Type.ARRAY, items: { type: Type.STRING } } 
                                } 
                            },
                            historyNarrative: { type: Type.STRING },
                            history: { 
                                type: Type.ARRAY, 
                                items: { 
                                    type: Type.OBJECT, 
                                    properties: { 
                                        year: { type: Type.STRING }, 
                                        event: { type: Type.STRING }, 
                                        impact: { type: Type.STRING } 
                                    } 
                                } 
                            },
                            subDisciplines: { type: Type.ARRAY, items: { type: Type.STRING } },
                            coreTheories: { 
                                type: Type.ARRAY, 
                                items: { 
                                    type: Type.OBJECT, 
                                    properties: { 
                                        name: { type: Type.STRING }, 
                                        year: { type: Type.STRING }, 
                                        summary: { type: Type.STRING } 
                                    } 
                                } 
                            },
                            methods: { 
                                type: Type.ARRAY, 
                                items: { 
                                    type: Type.OBJECT, 
                                    properties: { 
                                        name: { type: Type.STRING }, 
                                        description: { type: Type.STRING }, 
                                        example: { type: Type.STRING } 
                                    } 
                                } 
                            },
                            scholars: { 
                                type: Type.ARRAY, 
                                items: { 
                                    type: Type.OBJECT, 
                                    properties: { 
                                        name: { type: Type.STRING }, 
                                        country: { type: Type.STRING }, 
                                        period: { type: Type.STRING }, 
                                        contribution: { type: Type.STRING } 
                                    } 
                                } 
                            },
                            foundationalWorks: { 
                                type: Type.ARRAY, 
                                items: { 
                                    type: Type.OBJECT, 
                                    properties: { 
                                        title: { type: Type.STRING }, 
                                        author: { type: Type.STRING }, 
                                        year: { type: Type.STRING } 
                                    } 
                                } 
                            },
                            regionalFocus: { 
                                type: Type.ARRAY, 
                                items: { 
                                    type: Type.OBJECT, 
                                    properties: { 
                                        region: { type: Type.STRING }, 
                                        description: { type: Type.STRING } 
                                    } 
                                } 
                            },
                            relatedDisciplines: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    }
                }
            });
            const parsed = safeParse(response.text || '{}', FALLBACK_DISCIPLINE_DETAIL);
            if (!parsed.name) parsed.name = name;
            return parsed as DisciplineDetail;
        } catch (e) { return FALLBACK_DISCIPLINE_DETAIL; }
    });
};

export const fetchBookStructure = async (title: string, author: string): Promise<BookStructure> => {
    return withCache(`book_${title}_v2`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Table of contents for "${title}" by ${author}. JSON: { "title": string, "author": string, "chapters": string[] }.`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', { title, author, chapters: [] }) as BookStructure;
        } catch (e) { return { title, author, chapters: [] }; }
    });
};

export async function* streamChapterContent(title: string, author: string, chapter: string, summary: boolean) {
    const prompt = `Write the content for chapter "${chapter}" of "${title}" by ${author}. ${summary ? "Summarize key points." : "Provide full text or detailed summary."} ${getLanguageInstruction()}`;
    const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt
    });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export const askReaderQuestion = async (context: string, query: string, type: string): Promise<string> => {
    try {
        const response = await generateWithRetry({
            model: 'gemini-3-flash-preview',
            contents: `Context: ${context}\n\nTask: ${type}. ${query ? "Question: " + query : ""} \nAnswer:`
        });
        return response.text || "";
    } catch (e) { return "Error analyzing text."; }
};

export const fetchQuiz = async (topic: string): Promise<QuizQuestion[]> => {
    return withCache(`quiz_v5_50_${topic}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-pro-preview',
                contents: `Generate 50 distinct multiple choice questions about ${topic}. 
                Ensure questions vary in difficulty from introductory to expert.
                Cover history, key figures, theories, and modern applications.
                JSON Array of objects with question, options (string[]), correctAnswer (index number), explanation. ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    maxOutputTokens: 32768
                }
            });
            return safeParse(response.text || '[]', []) as QuizQuestion[];
        } catch (e) { return []; }
    });
};

export const fetchFlashcards = async (topic: string): Promise<Flashcard[]> => {
    return withCache(`flashcards_v5_50_${topic}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-pro-preview',
                contents: `Generate 50 comprehensive flashcards for ${topic}. 
                Cover definitions, key dates, important figures, and core concepts.
                JSON Array of objects with front, back, category. ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    maxOutputTokens: 32768
                }
            });
            return safeParse(response.text || '[]', []) as Flashcard[];
        } catch (e) { return []; }
    });
};

export const fetchRegionalDetail = async (region: string, discipline: string): Promise<RegionalDetail> => {
    return withCache(`region_v3_${region}_${discipline}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Political analysis of region: ${region} from perspective of ${discipline}. ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            region: { type: Type.STRING },
                            summary: { type: Type.STRING },
                            keyCountries: { type: Type.ARRAY, items: { type: Type.STRING } },
                            politicalThemes: { type: Type.ARRAY, items: { type: Type.STRING } },
                            challenges: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    }
                }
            });
            return safeParse(response.text || '{}', {}) as RegionalDetail;
        } catch (e) { return {} as RegionalDetail; }
    });
};

export const fetchOrganizationDetail = async (name: string): Promise<OrganizationDetail> => {
    return withCache(`org_v3_${name}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Detailed profile of organization: ${name}. ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            abbr: { type: Type.STRING },
                            type: { type: Type.STRING },
                            headquarters: { type: Type.STRING },
                            founded: { type: Type.STRING },
                            secretaryGeneral: { type: Type.STRING },
                            mission: { type: Type.STRING },
                            members: { type: Type.ARRAY, items: { type: Type.STRING } },
                            history: { type: Type.STRING },
                            keyOrgans: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, function: { type: Type.STRING } } } },
                            majorTreaties: { type: Type.ARRAY, items: { type: Type.STRING } },
                            budget: { type: Type.STRING },
                            ideologicalParadigm: { type: Type.STRING },
                            governanceModel: { type: Type.STRING },
                            satelliteOffices: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    }
                }
            });
            return safeParse(response.text || '{}', {}) as OrganizationDetail;
        } catch (e) { return {} as OrganizationDetail; }
    });
};

export const fetchPartyDetail = async (name: string, country: string): Promise<PoliticalPartyDetail> => {
    return withCache(`party_v2_${name}_${country}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Profile of political party: ${name} in ${country}. ${getLanguageInstruction()}`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', {}) as PoliticalPartyDetail;
        } catch (e) { return {} as PoliticalPartyDetail; }
    });
};

export const fetchPersonDetail = async (name: string): Promise<PersonDetail> => {
    return withCache(`person_v2_${name}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Political profile of ${name}. ${getLanguageInstruction()}`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', {}) as PersonDetail;
        } catch (e) { return {} as PersonDetail; }
    });
};

export const fetchEventDetail = async (name: string): Promise<EventDetail> => {
    return withCache(`event_v2_${name}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Detailed political event dossier: ${name}. ${getLanguageInstruction()}`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', {}) as EventDetail;
        } catch (e) { return {} as EventDetail; }
    });
};

export const fetchIdeologyDetail = async (name: string): Promise<IdeologyDetail> => {
    return withCache(`ideology_v2_${name}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Detailed analysis of political ideology: ${name}. ${getLanguageInstruction()}`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', {}) as IdeologyDetail;
        } catch (e) { return {} as IdeologyDetail; }
    });
};

export const fetchConceptDetail = async (term: string, context: string): Promise<ConceptDetail> => {
    return withCache(`concept_v2_${term}_${context}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Define political concept: "${term}" in context of "${context}".
                JSON with definition, context, examples (string[]), history. ${getLanguageInstruction()}`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', { term, definition: "Definition unavailable.", context, examples: [], history: "" }) as ConceptDetail;
        } catch (e) { return { term, definition: "Definition unavailable.", context, examples: [], history: "" }; }
    });
};

export const fetchHighlightDetail = async (highlight: HighlightedEntity): Promise<HighlightDetail> => {
    return withCache(`highlight_v7_${highlight.title}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Provide details for the highlighted entity: ${highlight.title} (${highlight.category}).
                ${getLanguageInstruction()}`,
                config: { 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            subtitle: { type: Type.STRING },
                            category: { type: Type.STRING },
                            summary: { type: Type.STRING },
                            historicalBackground: { type: Type.STRING },
                            significance: { type: Type.STRING },
                            keyConcepts: { 
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        concept: { type: Type.STRING },
                                        definition: { type: Type.STRING }
                                    }
                                }
                            },
                            modernConnections: { type: Type.ARRAY, items: { type: Type.STRING } },
                            sources: { 
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        title: { type: Type.STRING },
                                        url: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            const parsed = safeParse(response.text || '{}', {}) as any;
            return {
                title: parsed.title || highlight.title,
                subtitle: parsed.subtitle || highlight.subtitle,
                category: parsed.category || highlight.category,
                summary: parsed.summary || "Summary unavailable.",
                historicalBackground: parsed.historicalBackground || "Historical context unavailable.",
                significance: parsed.significance || "Significance unavailable.",
                keyConcepts: parsed.keyConcepts || [],
                modernConnections: parsed.modernConnections || [],
                sources: parsed.sources || []
            };
        } catch (e) { 
            return {
                title: highlight.title,
                subtitle: highlight.subtitle,
                category: highlight.category,
                summary: "Details currently unavailable.",
                historicalBackground: "",
                significance: "",
                keyConcepts: [],
                modernConnections: [],
                sources: []
            }; 
        }
    });
};

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    return withCache(`rates_v2_${new Date().getHours()}`, async () => { 
         try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Generate a JSON array of major exchange rates relative to USD.
                JSON: [{currencyCode: string, currencyName: string, rate: number, symbol: string, category: 'Fiat' | 'Crypto' | 'Historical' | 'Fictional'}].
                Include major fiat, top 5 crypto.
                Note: This is a simulation.`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '[]', []) as ExchangeRate[];
        } catch (e) { return []; }
    });
};

export const fetchCurrencyAnalysis = async (currency: string): Promise<{history: string, economics: string}> => {
    return withCache(`currency_analysis_v2_${currency}`, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-flash-preview',
                contents: `Analyze currency: ${currency}. Provide brief history and economic profile. JSON: {history: string, economics: string}. ${getLanguageInstruction()}`,
                config: { responseMimeType: "application/json" }
            });
            return safeParse(response.text || '{}', { history: "Unavailable", economics: "Unavailable" });
        } catch (e) { return { history: "Unavailable", economics: "Unavailable" }; }
    });
};


declare global {
    interface Window {
        aistudio: any;
    }
}

// --- Advanced AI Capabilities ---

export const generateImage = async (prompt: string, model: 'gemini-3.1-flash-image-preview' | 'gemini-2.5-flash-image' = 'gemini-2.5-flash-image', options: any = {}): Promise<string | null> => {
    try {
        const config: any = {};
        if (model === 'gemini-3.1-flash-image-preview') {
             config.imageConfig = {
                aspectRatio: options.aspectRatio || "1:1",
                imageSize: options.imageSize || "1K"
             };
        }

        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [{ text: prompt }]
            },
            config: config
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (e) {
        console.error("Image generation failed:", e);
        return null;
    }
};

export const editImage = async (base64Image: string, prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image.split(',')[1],
                            mimeType: "image/png"
                        }
                    },
                    { text: prompt }
                ]
            }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (e) {
        console.error("Image editing failed:", e);
        return null;
    }
};

export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9', image?: string): Promise<string | null> => {
    try {
        // Check for API key selection for Veo
        if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
            await window.aistudio.openSelectKey();
            // Re-check or just proceed assuming they did it
        }

        const payload: any = {
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        };

        if (image) {
            payload.image = {
                imageBytes: image.split(',')[1],
                mimeType: 'image/png'
            };
        }

        let operation = await ai.models.generateVideos(payload);

        // Poll for completion
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) return null;

        // Fetch the video content
        const apiKey = process.env.GEMINI_API_KEY;
        const videoResponse = await fetch(videoUri, {
            headers: { 'x-goog-api-key': apiKey || '' }
        });
        
        const blob = await videoResponse.blob();
        return URL.createObjectURL(blob);

    } catch (e) {
        console.error("Video generation failed:", e);
        return null;
    }
};

export const generateSpeech = async (text: string, voice: string = 'Kore'): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voice },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            return `data:audio/mp3;base64,${base64Audio}`;
        }
        return null;
    } catch (e) {
        console.error("TTS failed:", e);
        return null;
    }
};

export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
    try {
        const response = await generateWithRetry({
            model: 'gemini-3.1-pro-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image.split(',')[1],
                            mimeType: "image/png" // Assuming PNG for simplicity, could detect
                        }
                    },
                    { text: prompt }
                ]
            }
        });
        return response.text || "Analysis failed.";
    } catch (e) {
        console.error("Image analysis failed:", e);
        return "Analysis failed.";
    }
};

export const analyzeVideo = async (base64Video: string, prompt: string): Promise<string> => {
    // Note: Direct base64 video analysis might be limited by size. 
    // For large videos, File API is better, but here we assume short clips or frames.
    try {
        const response = await generateWithRetry({
            model: 'gemini-3.1-pro-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Video.split(',')[1],
                            mimeType: "video/mp4" 
                        }
                    },
                    { text: prompt }
                ]
            }
        });
        return response.text || "Analysis failed.";
    } catch (e) {
        console.error("Video analysis failed:", e);
        return "Analysis failed.";
    }
};

export const groundedSearch = async (query: string): Promise<{text: string, chunks: any[]}> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: query,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        return {
            text: response.text || "",
            chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
        };
    } catch (e) {
        console.error("Search grounding failed:", e);
        return { text: "Search unavailable.", chunks: [] };
    }
};

export const groundedMaps = async (query: string, location?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
    try {
        const config: any = {
            tools: [{ googleMaps: {} }],
        };
        
        if (location) {
            config.toolConfig = {
                retrievalConfig: {
                    latLng: {
                        latitude: location.lat,
                        longitude: location.lng
                    }
                }
            };
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: query,
            config: config
        });

        return {
            text: response.text || "",
            chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
        };
    } catch (e) {
        console.error("Maps grounding failed:", e);
        return { text: "Maps unavailable.", chunks: [] };
    }
};

export const thinkingMode = async (query: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: query,
            config: {
                thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
            }
        });
        return response.text || "No response.";
    } catch (e) {
        console.error("Thinking mode failed:", e);
        return "Thinking mode unavailable.";
    }
};

export const transcribeAudio = async (base64Audio: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Audio.split(',')[1],
                            mimeType: "audio/mp3" // Assuming MP3 or WAV, model is flexible
                        }
                    },
                    { text: "Transcribe this audio." }
                ]
            }
        });
        return response.text || "Transcription failed.";
    } catch (e) {
        console.error("Transcription failed:", e);
        return "Transcription failed.";
    }
};

export const connectLiveSession = async (onAudioData: (data: string) => void) => {
    // This returns the session promise to be used by the component
    return ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
            },
        },
        callbacks: {
            onopen: () => console.log("Live session connected"),
            onmessage: (msg) => {
                const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (base64Audio) onAudioData(base64Audio);
            },
            onclose: () => console.log("Live session closed"),
            onerror: (err) => console.error("Live session error:", err),
        }
    });
};

