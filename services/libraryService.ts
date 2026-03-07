import { generateWithFallback, cleanJson, withCache, getLanguageInstruction } from "./common";
import { streamWithClaude } from "./claudeService";
import { BookStructure } from "../types";

export const fetchBookStructure = async (title: string, author: string): Promise<BookStructure> => {
    return withCache(`book_${title}_structure_v6_pro`, async () => {
        try {
            const response = await generateWithFallback({ contents: `
                Generate a comprehensive Table of Contents for the document/book/song: "${title}" by ${author || "Unknown"}.

                RULES:
                1. If this is a Constitution, Law, or Treaty, list every Article, Section, and Amendment as a separate chapter.
                2. If this is a Non-Fiction book, list every Chapter.
                3. If this is a Song or Anthem, list "Full Lyrics", "Historical Origin", "Political Significance", and "Musical Analysis" as chapters.
                4. If the document is short (e.g. a speech), list "Full Text" as the only chapter.

                OUTPUT JSON ONLY: { "title": string, "author": string, "chapters": string[] }.
                ${getLanguageInstruction()}` });
            return JSON.parse(cleanJson(response.text || '{}')) as BookStructure;
        } catch (e) { return { title, author, chapters: ["Full Text"] }; }
    });
};

export async function* streamChapterContent(title: string, author: string, chapter: string) {
    const prompt = `
ROLE: You are a high-fidelity book digitizer and archivist.
TASK: Output the COMPLETE, UNABRIDGED text for chapter "${chapter}" of "${title}" by ${author}.

SPECIAL HANDLING FOR SONGS/ANTHEMS:
- If "${chapter}" is "Full Lyrics", output the lyrics clearly formatted with line breaks.

CRITICAL FORMATTING RULES:
1. **USE MARKDOWN FOR EMPHASIS**: Use **bold** for key terms/names and *italics* for emphasis or foreign words.
2. **NO HEADERS**: Do NOT use hashtags (#) for headers. The UI handles titles. Start directly with body text.
3. **NO ARTIFACTS**: Do NOT output JSON, code blocks, citations like [1], or meta-commentary.
4. **NO FILLER**: Do NOT say "Here is the text". Just output the content.
5. **PARAGRAPHS**: Separate paragraphs with exactly two newlines.

${getLanguageInstruction()}

BEGIN TEXT:
    `;
    yield* streamWithClaude(prompt);
}

export const askReaderQuestion = async (context: string, query: string, type: string): Promise<string> => {
    try {
        const response = await generateWithFallback({ contents: `Context: ${context.substring(0, 20000)}\n\nTask: ${type}. ${query ? "Question: " + query : ""} \nAnswer:` });
        return response.text || "";
    } catch (e) { return "Error analyzing text."; }
};
