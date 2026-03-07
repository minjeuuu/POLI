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
  "Congo (Democratic Republic)": "cd", "Democratic Republic of Congo": "cd",
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

/** Returns a flagcdn.com image URL for a given country name, or null if unknown. */
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
