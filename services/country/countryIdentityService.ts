
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryIdentity = async (countryName: string) => {
    const prompt = `
    GENERATE COMPLETE NATIONAL IDENTITY MATRIX: ${countryName}.
    SYSTEM OVERRIDE: POLI ARCHIVE V1.

    REQUIREMENTS:
    - **Official Name**: English, Native (script), Romanization.
    - **Flag**: Full history, symbolism of every color/element, designer, adoption date.
      FLAG IMAGE URL RULE: Always use this CDN format:
        https://flagcdn.com/w320/{ISO_ALPHA2_CODE_LOWERCASE}.png
        (e.g., France=fr, United States=us, Germany=de, Japan=jp)
    - **Coat of Arms**: Blazon, supporters, motto, history.
      EMBLEM IMAGE URL: Try Wikimedia Commons format if known, else leave as empty string.
    - **Anthem**: Native lyrics, Romanized, English translation (Full stanzas, clear breaks).
    - **Motto**: Native + Translation.
    - **Symbols**: Flower, Bird, Tree, Animal, Dish, Gem, Sport, Instrument.
    - **Codes**: ISO Alpha-2, Alpha-3, Numeric, TLD, Calling Code.

    RETURN JSON ONLY:
    {
      "identity": {
        "officialName": "string",
        "commonName": "string",
        "nativeName": { "name": "string", "script": "string", "romanization": "string", "pronunciation": "string", "meaning": "string" },
        "motto": { "text": "string", "romanization": "string", "translation": "string", "language": "string" },
        "currency": { "name": "string", "code": "string", "symbol": "string" },
        "flag": {
          "description": "string",
          "symbolism": "string",
          "history": "string",
          "designer": "string",
          "adopted": "string",
          "imageUrl": "https://flagcdn.com/w320/XX.png"
        },
        "coatOfArms": {
          "description": "string",
          "elements": ["string"],
          "history": "string",
          "variants": ["string"],
          "imageUrl": ""
        },
        "isoCodes": { "alpha2": "XX", "alpha3": "XXX", "numeric": "000" },
        "internetTLD": ".xx",
        "callingCode": "+X",
        "demonym": { "singular": "string", "plural": "string", "adjective": "string" },
        "nationalFlower": "string",
        "nationalBird": "string",
        "nationalTree": "string",
        "nationalAnimal": "string",
        "nationalDish": "string",
        "nationalAnthem": {
          "name": "string",
          "composer": "string",
          "year": "string",
          "lyrics": "string",
          "native": "string",
          "translation": "string"
        }
      }
    }
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });

    const parsed = safeParse(response.text || '{}', {}) as any;

    // Always ensure flag uses flagcdn.com based on alpha2 code
    if (parsed.identity?.isoCodes?.alpha2) {
        const alpha2 = parsed.identity.isoCodes.alpha2.toLowerCase().replace(/[^a-z]/g, '');
        if (alpha2.length === 2) {
            if (!parsed.identity.flag) parsed.identity.flag = {};
            parsed.identity.flag.imageUrl = `https://flagcdn.com/w320/${alpha2}.png`;
        }
    }

    return parsed;
};
