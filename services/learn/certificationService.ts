
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export interface Certificate {
    id: string;
    recipient: string;
    course: string;
    date: string;
    signature: string;
    description: string;
}

export const generateCertificate = async (username: string, course: string): Promise<Certificate> => {
    const prompt = `
    GENERATE ACADEMIC CERTIFICATE TEXT.
    RECIPIENT: ${username}
    COURSE: ${course}
    
    REQUIREMENTS:
    - Formal, academic tone.
    - A unique citation or quote related to the topic.
    - A digital signature name (e.g. "Archivist Theta").
    
    RETURN JSON:
    {
        "description": "Formal text confirming completion...",
        "signature": "Name of issuer"
    }
    ${getLanguageInstruction()}
    `;

    const res = await generateWithFallback({ contents: prompt });
    
    const data = safeParse(res.text || '{}', { description: "Awarded for excellence.", signature: "The Archivist" });
    
    return {
        id: `cert-${Date.now()}`,
        recipient: username,
        course: course,
        date: new Date().toLocaleDateString(),
        signature: data.signature,
        description: data.description
    };
};
