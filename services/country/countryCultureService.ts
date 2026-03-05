import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCultureProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE CULTURAL HERITAGE & TRADITIONS DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every field with real, specific, accurate data. Be encyclopedic.

RETURN JSON ONLY:
{
  "cuisine": ["string (at least 20 traditional dishes)"],
  "arts": ["string (at least 15 art forms)"],
  "sports": ["string (at least 12 sports + achievements)"],
  "holidays": ["string (at least 15 holidays with dates)"],
  "literature": ["string (at least 15 works/authors)"],
  "cinema": ["string (at least 15 films/directors)"],
  "music": ["string (at least 12 genres/artists)"],
  "fashion": ["string (at least 8 styles/designers)"],
  "architecture": ["string (at least 10 styles/landmarks)"],
  "folklore": ["string (at least 10 stories/myths)"],

  "food": {
    "overview": "string (paragraph on culinary traditions)",
    "regionalCuisines": [
      { "region": "string", "specialty": "string", "keyIngredients": ["string"], "description": "string" }
    ],
    "stapleIngredients": ["string"],
    "traditionalDishes": [
      { "name": "string", "type": "string (appetizer/main/dessert)", "ingredients": ["string"], "description": "string", "region": "string" }
    ],
    "streetFood": [
      { "name": "string", "location": "string", "description": "string" }
    ],
    "beverages": [
      { "name": "string", "type": "string (alcoholic/non-alcoholic)", "description": "string" }
    ],
    "foodEtiquette": ["string"],
    "mealTimes": "string",
    "celebrationFoods": ["string"],
    "fasting Traditions": "string",
    "topChefs": [
      { "name": "string", "specialty": "string", "restaurants": ["string"] }
    ]
  },

  "music": {
    "overview": "string",
    "traditionalGenres": [
      { "genre": "string", "origin": "string", "instruments": ["string"], "description": "string" }
    ],
    "popularGenres": [
      { "genre": "string", "description": "string" }
    ],
    "traditionalInstruments": [
      { "name": "string", "type": "string", "description": "string" }
    ],
    "famousMusicians": [
      { "name": "string", "genre": "string", "achievements": "string", "era": "string" }
    ],
    "topBands": ["string"],
    "musicFestivals": [
      { "name": "string", "location": "string", "month": "string", "genre": "string" }
    ],
    "musicIndustrySize": "string",
    "streamingCulture": "string"
  },

  "visualArts": {
    "overview": "string",
    "paintingTraditions": [
      { "style": "string", "era": "string", "description": "string" }
    ],
    "famousArtists": [
      { "name": "string", "medium": "string", "era": "string", "notableWorks": ["string"] }
    ],
    "topMuseums": [
      { "name": "string", "city": "string", "collection": "string", "founded": "string" }
    ],
    "contemporaryArtScene": "string",
    "streetArt": "string",
    "craftTraditions": [
      { "craft": "string", "region": "string", "materials": ["string"], "description": "string" }
    ],
    "textile": "string",
    "pottery": "string",
    "jewelry": "string"
  },

  "performingArts": {
    "theater": {
      "overview": "string",
      "traditionalForms": ["string"],
      "famousPlaywrights": ["string"],
      "topVenues": [{ "name": "string", "city": "string", "capacity": "string" }]
    },
    "dance": {
      "overview": "string",
      "traditionalDances": [
        { "name": "string", "region": "string", "occasion": "string", "description": "string" }
      ],
      "famousCompanies": ["string"],
      "contemporaryDance": "string"
    },
    "opera": "string",
    "circus": "string"
  },

  "literature": {
    "overview": "string",
    "literaryTradition": "string",
    "famousAuthors": [
      { "name": "string", "genre": "string", "era": "string", "notableWorks": ["string"], "awards": "string" }
    ],
    "notableWorks": [
      { "title": "string", "author": "string", "year": "string", "genre": "string", "significance": "string" }
    ],
    "nobelPrizeLiterature": ["string"],
    "publishingIndustry": "string",
    "topLiteraryFestivals": ["string"],
    "poetry": "string",
    "oralTradition": "string"
  },

  "cinema": {
    "overview": "string",
    "filmIndustry": "string",
    "annualFilmsProduced": "string",
    "boxOfficeRevenue": "string",
    "famousDirectors": [
      { "name": "string", "genre": "string", "notableFilms": ["string"], "awards": "string" }
    ],
    "famousActors": [
      { "name": "string", "era": "string", "notableFilms": ["string"] }
    ],
    "notableFilms": [
      { "title": "string", "director": "string", "year": "string", "awards": "string", "significance": "string" }
    ],
    "filmFestivals": [
      { "name": "string", "city": "string", "frequency": "string" }
    ],
    "streamingMarket": "string"
  },

  "sports": {
    "overview": "string",
    "nationalSport": "string",
    "popularSports": [
      { "sport": "string", "popularity": "string", "achievements": "string", "leagues": ["string"] }
    ],
    "olympicHistory": {
      "totalMedals": "string",
      "goldMedals": "string",
      "silverMedals": "string",
      "bronzeMedals": "string",
      "famousAthletes": [
        { "name": "string", "sport": "string", "achievements": "string" }
      ]
    },
    "worldCupHistory": "string",
    "topSportsStadiums": [
      { "name": "string", "city": "string", "capacity": "string", "sport": "string" }
    ],
    "sportsGoverningBodies": ["string"],
    "traditionalSports": ["string"],
    "eSports": "string",
    "sportsTourism": "string"
  },

  "festivals": {
    "majorFestivals": [
      { "name": "string", "date": "string", "type": "string (Religious/National/Cultural)", "description": "string", "location": "string", "rituals": ["string"] }
    ],
    "nationalHolidays": [
      { "name": "string", "date": "string", "significance": "string" }
    ],
    "harvest Festivals": ["string"],
    "religiousFestivals": ["string"],
    "folkFestivals": ["string"]
  },

  "traditions": {
    "greetingCustoms": "string",
    "weddingTraditions": "string",
    "funeralCustoms": "string",
    "birthCelebrations": "string",
    "comingOfAge": "string",
    "giftGivingEtiquette": "string",
    "tableManners": "string",
    "dressTraditions": "string",
    "tattooBody Art": "string",
    "superstitions": ["string"],
    "taboos": ["string"],
    "greetingPhrase": "string"
  },

  "fashion": {
    "overview": "string",
    "traditionalGarments": [
      { "name": "string", "gender": "string", "occasion": "string", "description": "string" }
    ],
    "fashionIndustry": "string",
    "famousDesigners": [
      { "name": "string", "style": "string", "achievements": "string" }
    ],
    "fashionWeeks": ["string"],
    "streetStyle": "string",
    "fashionExports": "string"
  },

  "architecture": {
    "overview": "string",
    "historicalStyles": [
      { "style": "string", "era": "string", "characteristics": ["string"], "examples": ["string"] }
    ],
    "iconicBuildings": [
      { "name": "string", "city": "string", "year": "string", "architect": "string", "style": "string", "significance": "string" }
    ],
    "contemporaryArchitecture": "string",
    "urbanPlanning": "string"
  },

  "folklore": {
    "mythology": "string",
    "famousMythsFolktales": [
      { "title": "string", "type": "string", "summary": "string", "significance": "string" }
    ],
    "legendaryFigures": ["string"],
    "tricksterFigures": ["string"],
    "heroicEpics": ["string"],
    "ghostStories": ["string"],
    "supernaturalBeliefs": "string"
  },

  "culturalExports": {
    "softPower": "string",
    "globalInfluence": "string",
    "culturalBrands": ["string"],
    "diasporaInfluence": "string",
    "tourism Cultural Draw": "string",
    "languageInfluence": "string"
  }
}
${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 32768 }
    });

    return safeParse(response.text || '{}', {});
};
