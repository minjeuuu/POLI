import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

async function run() {
    try {
        console.log("Testing API with search and JSON...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: "What is the latest score in the NBA? Return a simple JSON map.",
            config: {
                tools: [{ googleSearch: {} }]
            }
        });
        console.log("Success!", response.text);
    } catch(e: any) {
        console.error("Failed:", e.message);
    }
}
run();
