
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryIdentity = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE NATIONAL IDENTITY MATRIX: ${countryName}
CLASSIFICATION: EXHAUSTIVE IDENTITY & SYMBOLISM DOSSIER
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE national identity profile of ${countryName}. Every symbol, every emblem, every cultural identifier.

MANDATORY REQUIREMENTS:

1. OFFICIAL NAMES:
   - Official name in English, native language (with original script), romanization, pronunciation guide, etymological meaning
   - Common/short name, former names, colonial names
   - How the country is referred to in diplomatic contexts

2. FLAG (comprehensive):
   - Full physical description of the flag (every color, every element, exact proportions)
   - Symbolism of EVERY element (colors, shapes, emblems, stars, stripes)
   - Designer/author, date of adoption, previous flags
   - Proper display protocols
   - FLAG IMAGE URL: Use format https://flagcdn.com/w320/{ISO_ALPHA2_LOWERCASE}.png

3. COAT OF ARMS / NATIONAL EMBLEM:
   - Full heraldic blazon description
   - Supporters, crest, compartment, motto scroll
   - Symbolism of every element
   - History and evolution
   - EMBLEM IMAGE URL: Leave as empty string if unsure

4. NATIONAL ANTHEM:
   - Name in original language and English
   - Composer, lyricist, year adopted
   - FULL LYRICS in original language (ALL stanzas, not just first verse)
   - Romanization (if non-Latin script)
   - FULL English translation (ALL stanzas)
   - Historical context of composition

5. NATIONAL MOTTO:
   - Original language text, romanization, English translation
   - Language of motto, origin/history

6. ALL NATIONAL SYMBOLS:
   - National flower, bird, tree, animal, fish, butterfly/insect
   - National dish, fruit, sport, dance, costume/dress
   - National gem/stone, instrument, hero, saint/patron
   - For each: name, significance, when designated

7. CODES & IDENTIFIERS:
   - ISO Alpha-2, Alpha-3, Numeric codes
   - Internet TLD, calling code
   - Vehicle registration code, FIFA code, IOC code
   - FIPS code, UN membership status

8. CURRENCY:
   - Name, code, symbol, subunit
   - Central bank, year introduced
   - Current exchange rate approximate

9. NATIONAL DAYS:
   - Independence day, national day, republic day, other significant dates
   - How each is celebrated

RETURN VALID JSON ONLY:
{
    "identity": {
        "officialName": "string (full official name)",
        "commonName": "string",
        "formerNames": ["string"],
        "nativeName": { "name": "string", "script": "string", "romanization": "string", "pronunciation": "string", "meaning": "string" },
        "motto": { "text": "string", "romanization": "string", "translation": "string", "language": "string", "origin": "string" },
        "currency": { "name": "string", "code": "string", "symbol": "string", "subunit": "string", "centralBank": "string" },
        "flag": {
            "description": "string (detailed physical description)",
            "symbolism": "string (meaning of every element — min 200 words)",
            "history": "string (evolution of the flag)",
            "designer": "string",
            "adopted": "string",
            "proportions": "string",
            "imageUrl": "https://flagcdn.com/w320/XX.png"
        },
        "coatOfArms": {
            "description": "string (full heraldic blazon)",
            "elements": ["string"],
            "history": "string",
            "variants": ["string"],
            "imageUrl": ""
        },
        "isoCodes": { "alpha2": "XX", "alpha3": "XXX", "numeric": "000" },
        "otherCodes": { "fifa": "string", "ioc": "string", "vehicle": "string", "fips": "string" },
        "internetTLD": ".xx",
        "callingCode": "+X",
        "demonym": { "singular": "string", "plural": "string", "adjective": "string" },
        "nationalFlower": "string",
        "nationalBird": "string",
        "nationalTree": "string",
        "nationalAnimal": "string",
        "nationalFish": "string",
        "nationalDish": "string",
        "nationalFruit": "string",
        "nationalSport": "string",
        "nationalDance": "string",
        "nationalDress": "string",
        "nationalGem": "string",
        "nationalInstrument": "string",
        "nationalHero": "string",
        "nationalAnthem": {
            "name": "string",
            "nativeName": "string",
            "composer": "string",
            "lyricist": "string",
            "year": "string",
            "lyrics": "string (FULL lyrics — ALL stanzas in original language)",
            "romanization": "string (romanized version if non-Latin script)",
            "translation": "string (FULL English translation — ALL stanzas)",
            "history": "string (historical context)"
        },
        "nationalDays": [
            { "name": "string", "date": "string", "type": "string", "description": "string" }
        ]
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt });
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
