
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCultureProfile = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE CULTURAL HERITAGE DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE CULTURE, ARTS & TRADITIONS PROFILE
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE cultural profile of ${countryName}.

============================================================
SECTION 1: CULTURAL OVERVIEW
============================================================
- Cultural identity narrative (500+ words): what defines this culture
- Major cultural influences (indigenous, colonial, migration, globalization)
- UNESCO Intangible Cultural Heritage items (list ALL)
- UNESCO World Heritage Cultural Sites (list ALL with year inscribed)

============================================================
SECTION 2: ARTS & LITERATURE
============================================================
A. LITERATURE:
   - Major literary traditions, literary movements
   - Nobel Prize winners in literature (if any)
   - 20+ most important authors/poets with key works, years, significance
   - Major literary prizes in the country
   - Publishing industry overview

B. VISUAL ARTS:
   - Major art movements, art schools
   - 15+ most important visual artists
   - Major museums and galleries (list ALL major ones with location, website)
   - Contemporary art scene

C. PERFORMING ARTS:
   - Theater traditions (traditional and modern)
   - Dance forms (list ALL traditional dances with description)
   - Major performing arts venues, festivals

D. MUSIC:
   - Traditional music genres and instruments
   - Popular music genres, major artists (list 20+)
   - National music institutions, conservatories
   - Major music festivals

E. CINEMA & MEDIA:
   - Film industry overview: major studios, annual production, international recognition
   - 10+ most important directors and films
   - Major film festivals in the country
   - Animation/gaming industry

============================================================
SECTION 3: CUISINE & GASTRONOMY
============================================================
- National dishes (list 20+ with description, origin, ingredients)
- Regional culinary traditions
- Street food culture
- Beverages (traditional and modern)
- Food festivals, food heritage designations
- Famous chefs and restaurants
- Dining customs and etiquette

============================================================
SECTION 4: TRADITIONS & CUSTOMS
============================================================
- Major festivals and celebrations (list ALL with dates, description, significance)
- Religious practices and their cultural impact
- Marriage customs, birth traditions, funeral rites
- Social etiquette and taboos
- Traditional clothing/costumes (describe each)
- Handicrafts and artisan traditions
- Oral traditions, folklore, mythology

============================================================
SECTION 5: SPORTS & RECREATION
============================================================
- National sport(s), most popular sports
- Olympic medal count, notable athletes (list 15+)
- Major sports leagues and teams
- Traditional/indigenous sports and games
- Sports venues and stadiums (list major ones)
- International sporting events hosted

============================================================
SECTION 6: ARCHITECTURE
============================================================
- Major architectural styles and periods
- Most important buildings and structures (list 20+ with description, architect, year)
- Traditional housing styles
- Modern architectural landmarks
- Urban planning traditions

RETURN VALID JSON ONLY:
{
    "overview": "string (500+ words)",
    "culturalInfluences": ["string"],
    "unescoIntangible": [{ "name": "string", "year": "string", "description": "string" }],
    "unescoWorldHeritage": [{ "name": "string", "year": "string", "type": "string", "description": "string" }],
    "literature": {
        "overview": "string",
        "nobelWinners": [{ "name": "string", "year": "string", "work": "string" }],
        "majorAuthors": [{ "name": "string", "years": "string", "keyWorks": ["string"], "significance": "string" }],
        "literaryPrizes": [{ "name": "string", "focus": "string" }]
    },
    "visualArts": {
        "movements": ["string"],
        "majorArtists": [{ "name": "string", "medium": "string", "significance": "string" }],
        "museums": [{ "name": "string", "location": "string", "website": "string", "description": "string" }]
    },
    "performingArts": {
        "theater": ["string"],
        "dances": [{ "name": "string", "type": "string", "description": "string", "region": "string" }],
        "venues": [{ "name": "string", "location": "string", "capacity": "string" }]
    },
    "music": {
        "genres": ["string"],
        "instruments": [{ "name": "string", "type": "string", "description": "string" }],
        "majorArtists": [{ "name": "string", "genre": "string", "significance": "string" }],
        "festivals": [{ "name": "string", "location": "string", "month": "string" }]
    },
    "cinema": {
        "overview": "string",
        "majorDirectors": [{ "name": "string", "keyFilms": ["string"], "awards": "string" }],
        "filmFestivals": [{ "name": "string", "location": "string" }]
    },
    "cuisine": {
        "nationalDishes": [{ "name": "string", "description": "string", "origin": "string", "ingredients": ["string"] }],
        "streetFood": [{ "name": "string", "description": "string" }],
        "beverages": [{ "name": "string", "type": "string", "description": "string" }],
        "foodFestivals": [{ "name": "string", "location": "string", "month": "string" }]
    },
    "traditions": {
        "festivals": [{ "name": "string", "date": "string", "description": "string", "significance": "string" }],
        "customs": [{ "type": "string", "description": "string" }],
        "clothing": [{ "name": "string", "gender": "string", "occasion": "string", "description": "string" }],
        "folklore": [{ "name": "string", "type": "string", "description": "string" }]
    },
    "sports": {
        "nationalSport": "string",
        "popularSports": ["string"],
        "olympicMedals": { "gold": 0, "silver": 0, "bronze": 0, "total": 0 },
        "notableAthletes": [{ "name": "string", "sport": "string", "achievements": "string" }],
        "leagues": [{ "name": "string", "sport": "string", "teams": 0 }],
        "venues": [{ "name": "string", "location": "string", "capacity": "string", "sport": "string" }]
    },
    "architecture": {
        "styles": ["string"],
        "landmarks": [{ "name": "string", "location": "string", "architect": "string", "year": "string", "style": "string", "description": "string" }],
        "traditionalHousing": "string"
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
