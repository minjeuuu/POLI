// ISO 3166-1 alpha-2 codes mapped to country names used in COUNTRIES_DATA
export const COUNTRY_ISO2: Record<string, string> = {
  // A
  "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Andorra": "ad",
  "Angola": "ao", "Antigua and Barbuda": "ag", "Argentina": "ar", "Armenia": "am",
  "Australia": "au", "Austria": "at", "Azerbaijan": "az",
  // B
  "Bahamas": "bs", "Bahrain": "bh", "Bangladesh": "bd", "Barbados": "bb",
  "Belarus": "by", "Belgium": "be", "Belize": "bz", "Benin": "bj",
  "Bhutan": "bt", "Bolivia": "bo", "Bosnia and Herzegovina": "ba", "Botswana": "bw",
  "Brazil": "br", "Brunei": "bn", "Bulgaria": "bg", "Burkina Faso": "bf",
  "Burundi": "bi",
  // C
  "Cabo Verde": "cv", "Cape Verde": "cv", "Cambodia": "kh", "Cameroon": "cm",
  "Canada": "ca", "Central African Republic": "cf", "Chad": "td", "Chile": "cl",
  "China": "cn", "Colombia": "co", "Comoros": "km",
  "Congo (Democratic Republic)": "cd", "Democratic Republic of Congo": "cd", "DR Congo": "cd",
  "Congo (Republic)": "cg", "Republic of Congo": "cg", "Costa Rica": "cr",
  "Côte d'Ivoire": "ci", "Cote d'Ivoire": "ci", "Ivory Coast": "ci",
  "Croatia": "hr", "Cuba": "cu", "Cyprus": "cy", "Czech Republic": "cz",
  "Czechia": "cz",
  // D
  "Denmark": "dk", "Djibouti": "dj", "Dominica": "dm",
  "Dominican Republic": "do",
  // E
  "East Timor": "tl", "Timor-Leste": "tl", "Ecuador": "ec", "Egypt": "eg",
  "El Salvador": "sv", "Equatorial Guinea": "gq", "Eritrea": "er", "Estonia": "ee",
  "Eswatini": "sz", "Swaziland": "sz", "Ethiopia": "et",
  // F
  "Fiji": "fj", "Finland": "fi", "France": "fr",
  // G
  "Gabon": "ga", "Gambia": "gm", "Georgia": "ge", "Germany": "de",
  "Ghana": "gh", "Greece": "gr", "Grenada": "gd", "Guatemala": "gt",
  "Guinea": "gn", "Guinea-Bissau": "gw", "Guyana": "gy",
  // H
  "Haiti": "ht", "Honduras": "hn", "Hungary": "hu",
  // I
  "Iceland": "is", "India": "in", "Indonesia": "id", "Iran": "ir",
  "Iraq": "iq", "Ireland": "ie", "Israel": "il", "Italy": "it",
  // J
  "Jamaica": "jm", "Japan": "jp", "Jordan": "jo",
  // K
  "Kazakhstan": "kz", "Kenya": "ke", "Kiribati": "ki",
  "North Korea": "kp", "South Korea": "kr", "Kosovo": "xk", "Kuwait": "kw",
  "Kyrgyzstan": "kg",
  // L
  "Laos": "la", "Latvia": "lv", "Lebanon": "lb", "Lesotho": "ls",
  "Liberia": "lr", "Libya": "ly", "Liechtenstein": "li", "Lithuania": "lt",
  "Luxembourg": "lu",
  // M
  "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Maldives": "mv",
  "Mali": "ml", "Malta": "mt", "Marshall Islands": "mh", "Mauritania": "mr",
  "Mauritius": "mu", "Mexico": "mx", "Micronesia": "fm", "Moldova": "md",
  "Monaco": "mc", "Mongolia": "mn", "Montenegro": "me", "Morocco": "ma",
  "Mozambique": "mz", "Myanmar": "mm", "Burma": "mm",
  // N
  "Namibia": "na", "Nauru": "nr", "Nepal": "np", "Netherlands": "nl",
  "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng",
  "North Macedonia": "mk", "Norway": "no",
  // O
  "Oman": "om",
  // P
  "Pakistan": "pk", "Palau": "pw", "Palestine": "ps", "Panama": "pa",
  "Papua New Guinea": "pg", "Paraguay": "py", "Peru": "pe", "Philippines": "ph",
  "Poland": "pl", "Portugal": "pt",
  // Q
  "Qatar": "qa",
  // R
  "Romania": "ro", "Russia": "ru", "Rwanda": "rw",
  // S
  "Saint Kitts and Nevis": "kn", "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc", "Samoa": "ws",
  "San Marino": "sm", "São Tomé and Príncipe": "st", "Sao Tome and Principe": "st",
  "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Seychelles": "sc",
  "Sierra Leone": "sl", "Singapore": "sg", "Slovakia": "sk", "Slovenia": "si",
  "Solomon Islands": "sb", "Somalia": "so", "South Africa": "za",
  "South Sudan": "ss", "Spain": "es", "Sri Lanka": "lk", "Sudan": "sd",
  "Suriname": "sr", "Sweden": "se", "Switzerland": "ch", "Syria": "sy",
  // T
  "Taiwan": "tw", "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th",
  "Togo": "tg", "Tonga": "to", "Trinidad and Tobago": "tt", "Tunisia": "tn",
  "Turkey": "tr", "Türkiye": "tr", "Turkmenistan": "tm", "Tuvalu": "tv",
  // U
  "Uganda": "ug", "Ukraine": "ua", "United Arab Emirates": "ae",
  "United Kingdom": "gb", "United States": "us", "United States of America": "us",
  "Uruguay": "uy", "Uzbekistan": "uz",
  // V
  "Vanuatu": "vu", "Vatican City": "va", "Holy See": "va",
  "Venezuela": "ve", "Vietnam": "vn",
  // Y
  "Yemen": "ye",
  // Z
  "Zambia": "zm", "Zimbabwe": "zw",
};

/**
 * Multi-source flag URL generator with cascading fallbacks.
 * Returns an array of URLs to try in order — the UI component should
 * try each one and fall through on error.
 */
export const getFlagUrls = (countryName: string): string[] => {
    const urls: string[] = [];
    const iso = COUNTRY_ISO2[countryName];

    if (iso) {
        // Primary: flagcdn.com (most reliable, fast CDN)
        urls.push(`https://flagcdn.com/w320/${iso}.png`);
        // Secondary: hatscripts circle-flags (SVG, works for Kosovo etc.)
        urls.push(`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`);
        // Tertiary: countryflagsapi
        urls.push(`https://flagsapi.com/${iso.toUpperCase()}/flat/64.png`);
    }

    // Quaternary: REST Countries API flag (fetched at runtime by countryService)
    // This is handled separately in CountryHero and countryService

    return urls;
};

/** Returns the primary flag URL, or null if unknown. */
export const getFlagUrl = (countryName: string, size: 40 | 80 | 160 = 80): string | null => {
  const iso = COUNTRY_ISO2[countryName];
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
};

/** Returns 2x version of the flag for retina displays */
export const getFlagUrl2x = (countryName: string, size: 40 | 80 | 160 = 80): string | null => {
  const iso = COUNTRY_ISO2[countryName];
  if (!iso) return null;
  return `https://flagcdn.com/w${size * 2}/${iso}.png`;
};

/**
 * Generates a simple procedural flag SVG data URI for countries
 * that have no ISO code (fictional, historical, disputed territories).
 * Uses a hash of the country name to generate consistent colors.
 */
export const generateProceduralFlag = (countryName: string): string => {
    // Simple hash function for consistent colors
    let hash = 0;
    for (let i = 0; i < countryName.length; i++) {
        const char = countryName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    const hue1 = Math.abs(hash % 360);
    const hue2 = (hue1 + 120) % 360;
    const hue3 = (hue1 + 240) % 360;

    // Generate a simple tricolor flag
    const patterns = [
        // Horizontal tricolor
        `<rect width="900" height="200" fill="hsl(${hue1},70%,45%)"/><rect y="200" width="900" height="200" fill="hsl(${hue2},70%,95%)"/><rect y="400" width="900" height="200" fill="hsl(${hue3},70%,45%)"/>`,
        // Vertical tricolor
        `<rect width="300" height="600" fill="hsl(${hue1},70%,45%)"/><rect x="300" width="300" height="600" fill="hsl(${hue2},70%,95%)"/><rect x="600" width="300" height="600" fill="hsl(${hue3},70%,45%)"/>`,
        // Two-band horizontal
        `<rect width="900" height="300" fill="hsl(${hue1},70%,45%)"/><rect y="300" width="900" height="300" fill="hsl(${hue2},70%,45%)"/>`,
    ];

    const patternIndex = Math.abs(hash >> 8) % patterns.length;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">${patterns[patternIndex]}<circle cx="450" cy="300" r="80" fill="hsl(${hue1},60%,35%)" opacity="0.3"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
