# POLI — The Political Science Intelligence Platform

> *An encyclopedic, AI-powered research platform for political science, geopolitics, history, and global affairs — built for scholars, students, and curious minds.*

---

## Table of Contents

1. [Overview](#overview)
2. [Live Demo & Deployment](#live-demo--deployment)
3. [Feature Guide](#feature-guide)
4. [Architecture](#architecture)
5. [AI Engine](#ai-engine)
6. [Tech Stack](#tech-stack)
7. [Project Structure](#project-structure)
8. [Getting Started (Local)](#getting-started-local)
9. [Vercel Deployment](#vercel-deployment)
10. [Environment Variables](#environment-variables)
11. [API Reference](#api-reference)
12. [Mobile Support](#mobile-support)
13. [Theming System](#theming-system)
14. [Data & Content Pipeline](#data--content-pipeline)
15. [Troubleshooting](#troubleshooting)
16. [Roadmap](#roadmap)

---

## Overview

**POLI** is a full-stack, AI-first encyclopedia and research platform for political science and global affairs. Every detail page — country profiles, political figures, ideologies, historical events, organizations, legal texts — is generated on-demand by **Claude (Anthropic)** and cached for repeat visits.

The platform is structured as a Progressive Web App (PWA) with 16 dedicated content tabs, a real-time social feed, peer-to-peer messaging, a geopolitical simulation engine, AI-generated quizzes and flashcards, and a multi-engine AI lab for analysis and research.

### What Makes POLI Different

| Capability | Traditional Encyclopedia | POLI |
|---|---|---|
| Country Data | Static, updated annually | AI-generated on-demand, 23 deep modules |
| Political Figures | Brief biography | 1000-word psychobiography + full timeline |
| Historical Events | Summary entry | Minute-by-minute breakdown + aftermath |
| Legal Texts | External link | Full AI-generated analysis in-app |
| Social Feed | Not available | Academic discourse + polls + debates |
| Quizzes | Static question bank | 50 AI-generated questions per topic |
| Geopolitical Comparison | Not available | Side-by-side forensic analysis |
| Simulation | Not available | AI-powered scenario engine |

---

## Live Demo & Deployment

POLI is designed for zero-config deployment on **Vercel**:

```bash
vercel deploy
```

Or import the GitHub repo at [vercel.com/new](https://vercel.com/new). Vercel auto-detects `vercel.json`.

**Required before deployment:** Set `CLAUDE_API_KEY` in Vercel → Project Settings → Environment Variables.

---

## Feature Guide

### Home — Daily Intelligence Briefing
The home screen generates a fresh political briefing every day using Claude:
- **Quote of the Day** — A curated political philosophy quote with author and context
- **Global News Feed** — 8 synthesized headlines across regions and domains
- **Daily Fact & Trivia** — Obscure political facts and historical curiosities
- **Highlights** — AI-selected featured person, country, ideology, organization, and discipline with expandable deep-dives
- **Historical Timeline** — Every recorded political event for today's date across all of history, sorted chronologically from ancient times to the present
- **Synthesis** — A 300-word analytical synthesis of today's global political context
- **Date Navigation** — Explore the almanac for any date in history

### Explore — Knowledge Navigator
A hierarchical browser covering the entire political science discipline:
- **Disciplines** — Political Science, International Relations, Comparative Politics, Public Policy, Political Economy, and 30+ sub-disciplines
- **Regions** — Africa, Asia-Pacific, Americas, Europe, Middle East, Central Asia
- **Ideologies & Movements** — From Anarchism to Zionism, with deep-dive analysis pages
- **Historical Periods** — Ancient, Medieval, Early Modern, 20th Century, Contemporary
- **International Organizations** — UN system, regional bodies, treaty organizations

Each terminal node opens a Claude-generated deep-dive analysis page with full academic context.

### AI Lab — Multi-Modal Research Workspace
A comprehensive AI workspace for political research:
- **Text Analysis** — Extended political analysis with real-time streaming responses
- **Document Generation** — Research memos, briefings, policy analyses, speeches
- **Image Generation** — Political diagrams and visualizations (requires Gemini API key)
- **Image Editing** — AI-assisted image analysis and editing
- **Text-to-Speech** — Political speeches and analyses read aloud with voice selection
- **Thinking Mode** — Extended deep reasoning for complex geopolitical questions
- **Web Search Analysis** — Political topic research with source grounding

### Nations — Country Intelligence Suite
The most comprehensive country profile system available. Each country generates **23 parallel AI modules**:

| Module | Content |
|---|---|
| Identity | Flag, coat of arms, anthem, motto, national symbols, color palette |
| Government | Constitution, branches, elections, current leadership, political system |
| History | Complete timeline from ancient origins to present day |
| Economy | GDP, trade, sectors, major companies, FDI, monetary policy |
| Demographics | Population, ethnicity, language, religion, urbanization, migration |
| Geography | Terrain, climate, natural resources, borders, maritime claims |
| Politics | Parties, elections, coalitions, political risk, stability index |
| Legal | Constitution text, major codes, landmark cases, legal system type |
| Culture | Arts, music, cuisine, fashion, architecture, film, festivals |
| Society | Social stratification, gender equality, LGBTQ+ rights, human rights |
| Education | System overview, universities, literacy, international rankings |
| Health | Healthcare system, major indicators, disease burden, life expectancy |
| Environment | Climate policy, biodiversity, emissions, protected areas, disasters |
| Technology | Digital infrastructure, innovation index, tech industry, startups |
| Military | Armed forces structure, defense spending, alliances, doctrine |
| Infrastructure | Transport networks, energy systems, communications |
| Tourism | Major attractions, UNESCO sites, visa policy, travel advisory |
| Global Affairs | Foreign policy, diplomatic relations, UN voting positions |
| Academic | Universities, think tanks, political journals, research output |
| News | 8 recent stories with sources and publication dates |
| Maps | Political, physical, economic, and historical maps |
| Images | 9-image archive (historical, governmental, cultural) |
| Analysis | SWOT analysis, political risk matrix, stability index |

### Persons — Political Figure Database
AI-generated profiles for any political figure in history:
- Full psychobiography (1000+ words, multiple paragraphs)
- Early life, education, and formative experiences
- Complete offices held with exact years
- Allies, rivals, mentors, and proteges network
- Personal life, controversies, and scandals
- Awards, honors, and international recognition
- Psychological profile and leadership style analysis
- Media presence and key speeches
- Portrait image from Wikimedia Commons (with graceful fallback)

### Theory — Ideologies & Disciplines
Deep-dive pages for every major political ideology and academic discipline:
- Core principles and philosophical foundations
- Historical origins, key events, and development
- Key thinkers, foundational texts, and seminal works
- Contemporary manifestations and modern variants
- Critiques, counter-movements, and internal debates
- Global distribution and political influence

### Read — AI Research Library
A full streaming reading environment powered by Claude:
- Any political science book, treatise, or article — summarized and analyzed
- Legal constitutions, codes, and treaties — full analysis with annotation
- Research papers — methodology, findings, and significance
- Reader mode with real-time Claude streaming generation
- Search any legal document by name for instant AI-generated analysis

### Almanac — Historical Political Calendar
A comprehensive political almanac for every day of the year:
- **Historical Events** — Wars, battles, speeches, coups, treaties
- **Births & Deaths** — Political figures born or who died on this date
- **Treaties** — Agreements and pacts signed on this date
- **Elections** — Electoral contests held on this date
- **Revolutions** — Uprisings and independence movements
- **Laws & Constitutions** — Landmark legislation enacted
- **Forthcoming Events** — Global elections, summits, treaty expirations
- Chronological timeline view with category filtering

### Compare — Geopolitical Analysis Engine
Side-by-side forensic comparison of any two countries, ideologies, or political systems:
- Multi-dimensional comparison matrix (political, economic, social, military)
- 5 scenario simulations (economic war, military conflict, diplomatic alliance, etc.)
- Historical precedent analysis from similar comparisons
- Visualized data comparison with AI-written synthesis

### Sim — Geopolitical Simulation Engine
Scenario-based simulation for political science research:
- State formation and collapse modeling
- Election outcome scenarios
- Coalition formation and breakdown analysis
- Conflict escalation and de-escalation modeling
- Foreign policy decision trees

### Learn — AI-Generated Study Materials
- **Flashcards** — 50 AI-generated cards per topic with front/back and category tags
- **Quizzes** — 50 multiple-choice questions with detailed explanations for each answer
- **Debate Practice** — AI generates structured arguments for any political position

### Games — Interactive Political Science Games
- Constitutional drafting challenges
- Geopolitical strategy and resource allocation puzzles
- Political figure identification and trivia
- Treaty negotiation and diplomatic simulations

### Markets — Global Economic Data
- Real-time exchange rates and currency data
- Commodity price tracking
- Economic indicator dashboards organized by country and region
- Currency conversion tools

### Feed — Academic Social Network
A real-time academic discourse platform:
- Post political analyses (Analysis, Theory, Poll, Debate, Video, Reel types)
- Reaction system: **Valid · Disputed · Citation Needed · Hearts**
- Comment threading with academic credential display
- Reels mode — vertical scroll for short-form political content
- Video and image embedding
- Real-time feed updates via REST polling

### Chat — Secure Messaging
- Group and direct message channels
- File and image sharing with preview
- Typing indicators
- Message history loaded on channel join
- Real-time delivery via REST polling

### Profile — Scholar Profile System
- Customizable academic profile with level and XP system
- Reading history and bookmarked items
- Achievement badges and progression tracking
- Language preference (affects AI response language)
- Theme selection across 35+ visual themes
- Notification preferences

---

## Architecture

```
POLI/
├── api/
│   └── server.ts          # Vercel serverless Express handler
│                          # (Claude proxy, posts, messages, uploads)
├── components/
│   ├── tabs/              # 16 main tab screens
│   ├── country/           # Country detail sub-components (23 modules)
│   ├── home/              # Home screen widgets
│   ├── social/            # Social feed components
│   ├── atoms/             # Reusable atomic components
│   └── chat/              # Messaging components
├── services/
│   ├── common.ts          # AI core: generateWithFallback → Claude
│   ├── claudeService.ts   # Claude browser proxy + server client
│   ├── countryService.ts  # Country orchestrator (23 parallel fetches)
│   ├── country/           # 23 country sub-service modules
│   ├── homeService.ts     # Daily briefing generation
│   ├── personService.ts   # Political figure profiles
│   ├── eventService.ts    # Historical event deep-dives
│   ├── searchService.ts   # Universal search + topic dossiers
│   └── ...                # 20+ additional service modules
├── data/
│   ├── countriesData.ts   # 195 country metadata records
│   ├── exploreData.ts     # Knowledge hierarchy (navigation only)
│   ├── personsData.ts     # Political figures taxonomy (navigation)
│   ├── theoryData.ts      # Ideologies taxonomy (navigation)
│   ├── legal/             # Legal document index
│   ├── archives/          # Historical events database
│   └── ...                # Additional static data files
├── types.ts               # TypeScript type definitions
├── App.tsx                # Root app + global routing state
├── server.ts              # Local development Express server
├── api/server.ts          # Vercel production serverless handler
└── vercel.json            # Vercel deployment configuration
```

### Request Flow (Vercel)

```
Browser
  │
  ├─ Static assets (JS/CSS/HTML) ────────► dist/ (Vercel global CDN)
  │
  └─ /api/* requests ─────────────────────► api/server.ts (Serverless Function)
                                                │
                                                ├─ /api/ai/generate ──► Anthropic API
                                                ├─ /api/ai/stream  ──► Anthropic API (SSE)
                                                ├─ /api/posts      ──► In-memory store
                                                ├─ /api/messages   ──► In-memory store
                                                └─ /api/upload     ──► Memory buffer → base64
```

### AI Content Pipeline

```
User navigates to Country / Person / Event / Ideology
  │
  ▼
withCache() checks in-memory session cache
  │
  ├─ CACHE HIT  ────────────────────────────► Return instantly (0ms)
  │
  └─ CACHE MISS
       │
       ▼
  generateWithFallback({ contents: prompt })
       │
       ▼
  Browser calls: POST /api/ai/generate
       │
       ▼
  api/server.ts → Anthropic API
  (claude-sonnet-4-6, up to 16k output tokens)
       │
       ▼
  JSON response parsed by safeParse()
       │
       ▼
  deepMerge(fallbackData, aiData)
       │
       ▼
  Component renders complete AI-generated content
  Result saved to cache for session
```

---

## AI Engine

POLI uses **Claude Sonnet 4.6** (`claude-sonnet-4-6`) as its sole AI engine for all content generation.

### Security: API Key Never Exposed

The `CLAUDE_API_KEY` lives only in `api/server.ts` (server-side). The browser **never** has access to it.

```
Browser ──POST /api/ai/generate──► api/server.ts ──x-api-key──► Anthropic
         { prompt }                 (key is here)               API
```

### Streaming Support

Long-form content (ReaderView, AI Lab) streams via Server-Sent Events:

```
Browser reads SSE stream in real-time
  ←── data: {"text":"The "}\n\n
  ←── data: {"text":"analysis "}\n\n
  ←── data: {"text":"continues..."}\n\n
  ←── data: [DONE]\n\n
```

### Caching Strategy

```typescript
withCache(`country_poli_v2_full_France`, async () => {
  // This async function runs ONCE per session per country
  // 23 parallel Claude calls → merged result → cached
  return await fetchAllCountryModules('France');
});
// Second call to France: returns instantly from cache
```

### JSON Repair

All AI JSON responses pass through `JSONRepair.parse()` which handles:
- Markdown code fence stripping (```json ... ```)
- Trailing comma removal
- Missing bracket completion
- Thinking block removal (`<thinking>...</thinking>`)
- Multi-stage repair with fallback to provided fallback object

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.3 | UI framework with concurrent features |
| TypeScript | 5.8.2 | Full type safety across 100+ components |
| Vite | 6.2.0 | Build tool with HMR |
| Tailwind CSS | (utility config) | Utility-first responsive styling |
| Lucide React | 0.469.0 | Consistent icon library (600+ icons) |
| React Confetti | 6.1.0 | Achievement celebration effects |

### Backend / Serverless
| Technology | Version | Purpose |
|---|---|---|
| Express | 5.2.1 | HTTP routing (both local dev and Vercel) |
| Multer | 2.1.0 | File upload handling (memory storage) |
| CORS | 2.8.6 | Cross-origin request headers |
| Node.js | 18+ | JavaScript runtime |
| tsx | 4.21.0 | TypeScript execution for dev server |

### AI Services
| Service | Model | Usage |
|---|---|---|
| Anthropic Claude | claude-sonnet-4-6 | All content generation (primary + only) |
| Google Gemini | gemini-2.5-flash-image | AI Lab image generation (optional) |

### External APIs & CDNs
| Service | Purpose |
|---|---|
| Anthropic API | AI content generation |
| REST Countries API | Flag URLs, coat of arms, ISO codes |
| Wikimedia Commons | Historical images, portraits |
| Picsum Photos | Reliable image fallbacks (seed-based) |
| FlagCDN | Country flag images (3-stage fallback) |
| WebRTC STUN (Google) | Peer-to-peer connection (local dev) |

### Infrastructure
| Platform | Usage |
|---|---|
| **Vercel** | Hosting, CDN, serverless functions |
| Docker | Self-hosted containerization |
| Render / Fly.io | Alternative hosting platforms |

---

## Project Structure

```
POLI/
├── api/
│   └── server.ts                  # Vercel serverless handler (all /api/* routes)
│                                  # Express + Claude proxy + multer memory upload
│
├── components/
│   ├── tabs/
│   │   ├── HomeTab.tsx             # Daily briefing + date navigation
│   │   ├── ExploreTab.tsx          # Knowledge hierarchy browser
│   │   ├── AILabTab.tsx            # Multi-modal AI workspace
│   │   ├── CountriesTab.tsx        # Country grid/list/table with search
│   │   ├── PersonsTab.tsx          # Political figures browser
│   │   ├── TheoryTab.tsx           # Ideologies + disciplines
│   │   ├── LibraryTab.tsx          # Research library + reader
│   │   ├── AlmanacTab.tsx          # Daily historical calendar
│   │   ├── ComparativeTab.tsx      # Country/ideology comparison
│   │   ├── SimTab.tsx              # Geopolitical simulation
│   │   ├── GamesTab.tsx            # Interactive games
│   │   ├── LearnTab.tsx            # Flashcards + quizzes
│   │   ├── RatesTab.tsx            # Market data + exchange rates
│   │   ├── SocialTab.tsx           # Academic social feed
│   │   ├── MessageTab.tsx          # Real-time messaging
│   │   └── ProfileTab.tsx          # User profile + settings
│   │
│   ├── country/
│   │   ├── CountryDetailScreen.tsx # Main country layout
│   │   ├── overview/               # Hero, flag, summary, identity
│   │   ├── government/             # Leadership, branches, elections
│   │   ├── economy/                # GDP, trade, sectors
│   │   ├── culture/                # Arts, cuisine, fashion, film
│   │   ├── geography/              # Maps, terrain, climate
│   │   ├── military/               # Defense, alliances, doctrine
│   │   ├── network/                # Diplomatic relations graph
│   │   ├── os/                     # Online presence + tech
│   │   ├── sim/                    # Country simulation module
│   │   └── visuals/                # Image archive grid
│   │
│   ├── home/
│   │   ├── NewsWidget.tsx          # Global news feed
│   │   ├── QuoteWidget.tsx         # Daily political quote
│   │   ├── HistoryFeed.tsx         # On-this-day timeline
│   │   ├── TriviaWidget.tsx        # Daily fact + trivia
│   │   ├── DashboardGrid.tsx       # Highlights grid
│   │   └── SynthesisWidget.tsx     # AI political synthesis
│   │
│   ├── social/
│   │   └── TrendRadar.tsx          # Trending topics visualization
│   │
│   ├── atoms/                      # Reusable atomic UI components
│   ├── chat/                       # Messaging sub-components
│   │
│   ├── GlobalHeader.tsx            # Fixed top nav bar
│   ├── Layout.tsx                  # App shell + 16-tab bottom nav
│   ├── LaunchScreen.tsx            # Animated launch screen
│   ├── AuthScreen.tsx              # Login / register UI
│   ├── IntroScreen.tsx             # Onboarding flow
│   ├── PersonDetailScreen.tsx      # Political figure deep-dive
│   ├── EventDetailScreen.tsx       # Historical event deep-dive
│   ├── OrgDetailScreen.tsx         # Organization profile
│   ├── PartyDetailScreen.tsx       # Political party profile
│   ├── IdeologyDetailScreen.tsx    # Ideology analysis
│   ├── DisciplineDetailScreen.tsx  # Academic discipline
│   ├── ConceptDetailModal.tsx      # Political concept card
│   ├── GenericKnowledgeScreen.tsx  # Universal topic dossier
│   ├── ReaderView.tsx              # Streaming document reader
│   ├── ComparisonView.tsx          # Comparison result display
│   ├── Timeline.tsx                # Historical timeline component
│   ├── FlashcardView.tsx           # Flashcard study mode
│   ├── QuizView.tsx                # Quiz question display
│   ├── DebateView.tsx              # Structured debate UI
│   ├── AlmanacDetailScreen.tsx     # Almanac entry detail
│   ├── HighlightDetailScreen.tsx   # Highlight detail modal
│   ├── LoadingScreen.tsx           # Loading state
│   ├── Logo.tsx                    # POLI logo mark
│   ├── IconMap.tsx                 # Icon name → component map
│   ├── EntityHeader.tsx            # Shared entity page header
│   ├── FallbackAI.tsx              # AI error display component
│   └── PWAInstallButton.tsx        # PWA install prompt
│
├── services/
│   ├── common.ts                   # AI core: generateWithFallback → Claude
│   ├── claudeService.ts            # Claude proxy client + streaming
│   ├── geminiService.ts            # Gemini (image gen + legacy)
│   ├── ollamaService.ts            # Ollama local AI (dev only)
│   ├── socket.ts                   # No-op mock (Vercel-compatible)
│   ├── database.ts                 # IndexedDB wrapper
│   ├── soundService.ts             # SFX + audio playback
│   ├── audioService.ts             # TTS audio management
│   ├── translateService.ts         # AI translation service
│   ├── searchService.ts            # Universal search + dossiers
│   ├── homeService.ts              # Daily briefing + highlights
│   ├── countryService.ts           # Country orchestrator
│   ├── personService.ts            # Person profiles
│   ├── eventService.ts             # Historical events
│   ├── orgService.ts               # Organizations
│   ├── partyService.ts             # Political parties
│   ├── theoryService.ts            # Ideologies + disciplines
│   ├── almanacService.ts           # Almanac generation
│   ├── compareService.ts           # Comparison engine
│   ├── simService.ts               # Simulation engine
│   ├── learnService.ts             # Quizzes + flashcards
│   ├── libraryService.ts           # Document library
│   ├── socialService.ts            # Social feed helpers
│   ├── ratesService.ts             # Currency + market data
│   ├── countryFallback.ts          # Default country structure
│   └── country/                    # 23 country sub-services
│       ├── countryIdentityService.ts
│       ├── countryGovernmentService.ts
│       ├── countryHistoryService.ts
│       ├── countryEconomyService.ts
│       ├── countryDemographicsService.ts
│       ├── countryGeographyService.ts
│       ├── countryPoliticsService.ts
│       ├── countrySymbolsService.ts
│       ├── countryLegalService.ts
│       ├── countryAcademicService.ts
│       ├── countryInfrastructureService.ts
│       ├── countryGlobalService.ts
│       ├── countryAnalysisService.ts
│       ├── countryEnvironmentService.ts
│       ├── countryTechService.ts
│       ├── countrySocietyService.ts
│       ├── countryTourismService.ts
│       ├── countryCultureService.ts
│       ├── countryHealthService.ts
│       ├── countryEducationService.ts
│       ├── countryTimelineService.ts
│       ├── countryImageService.ts   # Images via Claude + picsum fallback
│       ├── countryMapService.ts     # Maps via Claude + Wikimedia
│       └── countryNewsService.ts    # News via Claude knowledge
│
├── data/
│   ├── countriesData.ts             # 195 countries metadata
│   ├── exploreData.ts               # Explore tab hierarchy (navigation)
│   ├── personsData.ts               # Political figures taxonomy (navigation)
│   ├── theoryData.ts                # Ideologies taxonomy (navigation)
│   ├── homeData.ts                  # Fallback constants + media data
│   ├── staticCountries.ts           # Pre-generated cache (empty)
│   ├── socialData.ts                # Social feed seed posts
│   ├── quotes.ts                    # Political philosophy quotes
│   ├── currencyData.ts              # Currency codes and symbols
│   ├── legal/                       # Legal document index
│   │   └── constitutions.ts
│   ├── archives/                    # Historical events database
│   │   └── massiveHistory.ts
│   ├── library/                     # Book metadata
│   │   ├── modernBooks.ts
│   │   └── ancientBooks.ts
│   ├── sim/                         # Simulation configurations
│   │   └── ideologies.ts
│   ├── games/                       # Game definitions
│   │   └── gameLibrary.ts
│   ├── dictionaries/                # Word lists for procedural generation
│   ├── ontology/                    # Political concept taxonomy
│   └── sociology/                   # Sociology data
│
├── hooks/                           # React custom hooks
├── utils/                           # Utility functions
│   ├── exportUtils.ts               # CSV / JSON export
│   ├── image/                       # Canvas image export
│   └── searchLogic.ts               # Search query resolution
├── themes/                          # Theme definitions
├── types.ts                         # All TypeScript interfaces
├── types/                           # Extended type modules
├── constants.ts                     # App-wide constants
├── i18n/                            # Internationalization
├── metadata.json                    # PWA metadata
│
├── App.tsx                          # Root component + global state + routing
├── index.tsx                        # React entry point
├── index.html                       # HTML shell + PWA meta tags
├── index.css                        # Global styles + Tailwind directives
│
├── server.ts                        # Local development server (Express + Socket.IO)
├── api/server.ts                    # Vercel production serverless handler
├── vite.config.ts                   # Vite build + dev configuration
├── tsconfig.json                    # TypeScript compiler config
├── vercel.json                      # Vercel deployment config
├── Dockerfile                       # Docker container definition
├── docker-compose.yml               # Docker Compose orchestration
├── render.yaml                      # Render.com deployment config
├── fly.toml                         # Fly.io deployment config
└── package.json                     # Dependencies + scripts
```

---

## Getting Started (Local)

### Prerequisites
- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **Claude API Key** — [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd POLI

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Open .env and add CLAUDE_API_KEY=sk-ant-...
```

### Running the Development Server

```bash
npm run dev
```

The app runs at **http://localhost:3000**. The dev server uses Express (from `server.ts`) which:
- Serves the React app via Vite middleware (with HMR)
- Handles all `/api/*` routes including the Claude proxy
- Reads `CLAUDE_API_KEY` from your `.env` file

### Production Build

```bash
npm run build   # Vite builds to dist/
npm start       # Express serves dist/ + API routes
```

### Docker

```bash
docker build -t poli .
docker run -p 3000:3000 \
  -e CLAUDE_API_KEY=sk-ant-... \
  poli

# With Docker Compose
docker-compose up --build
```

### TypeScript Check

```bash
npm run lint    # Runs tsc --noEmit
```

---

## Vercel Deployment

POLI deploys to Vercel as a **static SPA + serverless API** — no persistent server required.

### How It Works on Vercel

| Layer | Mechanism |
|---|---|
| Frontend | Vite builds to `dist/`, served from Vercel's global CDN |
| All `/api/*` | Rewritten to `api/server.ts` serverless function |
| All other routes | Rewritten to `dist/index.html` (SPA fallback) |
| Real-time features | REST polling every 3–5s (replaces Socket.IO) |
| File uploads | Multer memory storage → base64 data URL |
| Claude API key | Server-side only, never in browser bundle |

### Deploying via Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new) and import your repository
3. Vercel detects `vercel.json` automatically — no configuration needed
4. Add environment variable: **`CLAUDE_API_KEY`** = your Anthropic key
5. Click **Deploy**

### Deploying via CLI

```bash
npm install -g vercel
vercel login

# First deploy (creates project)
vercel

# Add environment variables
vercel env add CLAUDE_API_KEY production
vercel env add GEMINI_API_KEY production   # Optional

# Deploy to production
vercel --prod
```

### vercel.json Explained

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "functions": {
    "api/server.ts": {
      "maxDuration": 60
    }
  },
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/server" },
    { "source": "/:path*",    "destination": "/index.html" }
  ]
}
```

| Setting | Purpose |
|---|---|
| `buildCommand` | Runs `vite build` to produce `dist/` |
| `outputDirectory` | Vercel serves `dist/` from CDN |
| `maxDuration: 60` | Allows Claude API calls up to 60s (country profiles need ~20s) |
| API rewrite | All `/api/*` requests go to the single Express handler |
| SPA rewrite | Everything else serves `index.html` for React Router |

### Vercel Plan Comparison

| Feature | Hobby (Free) | Pro |
|---|---|---|
| Function timeout | 60 seconds | 300 seconds |
| Function memory | 1 GB | 3 GB |
| Bandwidth | 100 GB/month | 1 TB/month |
| Concurrent builds | 1 | Unlimited |
| Country profiles (first load) | ~15–25 seconds | ~10 seconds |
| Subsequent loads | Instant (cached) | Instant (cached) |

Country profiles run 23 parallel Claude calls on first load. After that, results are cached for the session and load instantly. Vercel Hobby plan is sufficient for development and moderate traffic.

---

## Environment Variables

### Complete Reference

| Variable | Required | Scope | Description |
|---|---|---|---|
| `CLAUDE_API_KEY` | **Yes** | Server only | Anthropic API key. All content generation. Set in Vercel Environment Variables. Never exposed to browser. |
| `VITE_CLAUDE_API_KEY` | No | Server only | Alternative name for `CLAUDE_API_KEY` (legacy). Prefer `CLAUDE_API_KEY`. |
| `GEMINI_API_KEY` | No | Server only | Google Gemini key. Only for AI Lab image generation (`geminiService.ts`). |
| `VITE_GEMINI_API_KEY` | No | Browser | Client-side Gemini key for browser-side image generation in AI Lab. |
| `PORT` | No | Server | HTTP port for local/Docker. Default: `3000`. Ignored by Vercel. |
| `NODE_ENV` | No | Server | `development` = Vite dev middleware. `production` = serve `dist/`. Vercel sets automatically. |
| `VITE_OLLAMA_URL` | No | Browser | Ollama server URL for local AI (dev only). Default: `http://localhost:11434`. |
| `VITE_OLLAMA_MODEL` | No | Browser | Ollama model name. Default: `llama3.2`. |

### .env.example Template

```env
# ============================================================
# POLI — Environment Configuration
# Copy this file to .env and fill in your values.
# NEVER commit .env to version control.
# ============================================================

# ── AI SERVICES ─────────────────────────────────────────────

# Anthropic Claude — Required for all content generation
# Get key: https://console.anthropic.com/settings/keys
CLAUDE_API_KEY=sk-ant-api03-...

# Google Gemini — Optional (AI Lab image generation only)
# Get key: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=AIzaSy...
VITE_GEMINI_API_KEY=AIzaSy...

# ── LOCAL DEVELOPMENT ───────────────────────────────────────

# Ollama local AI (optional dev fallback — https://ollama.ai)
VITE_OLLAMA_URL=http://localhost:11434
VITE_OLLAMA_MODEL=llama3.2

# ── SERVER ──────────────────────────────────────────────────
PORT=3000
NODE_ENV=development
```

---

## API Reference

All API routes are handled by `api/server.ts` and served at `/api/*`.

### AI Generation

#### `POST /api/ai/generate`
Generate content with Claude. The API key never leaves the server.

```bash
curl -X POST https://your-app.vercel.app/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain the Treaty of Westphalia", "maxTokens": 4000}'
```

**Request body:**
| Field | Type | Required | Description |
|---|---|---|---|
| `prompt` | string | Yes | The generation prompt |
| `system` | string | No | System prompt override |
| `maxTokens` | number | No | Max output tokens (default: 16000) |

**Response:**
```json
{ "text": "The Treaty of Westphalia (1648)..." }
```

**Error codes:**
- `400` — Missing `prompt`
- `503` — `CLAUDE_API_KEY` not configured
- `429` — Anthropic rate limit
- `500` — Internal proxy error

---

#### `POST /api/ai/stream`
Stream Claude responses as Server-Sent Events.

**Request body:** Same as `/api/ai/generate` (without `maxTokens`)

**Response:** SSE stream
```
Content-Type: text/event-stream

data: {"text":"The "}
data: {"text":"Treaty "}
data: {"text":"of Westphalia..."}
data: [DONE]
```

On error: `data: [ERROR]`

---

### Social Posts

#### `GET /api/posts`
Fetch all posts (seed posts + user-created).
**Response:** Array of `SocialPost` objects.

#### `POST /api/posts`
Create a post. The post is also broadcast to polling clients.
**Request:** `SocialPost` object.

#### `POST /api/posts/:id/like`
Increment heart count. **Response:** Updated `SocialPost`.

#### `POST /api/posts/:id/comment`
Add a comment. **Request:** Comment object. **Response:** Updated `SocialPost`.

---

### Messaging

#### `GET /api/messages/:chatId`
Fetch all messages for a chat channel. **Response:** Array of `ChatMessage`.

#### `POST /api/messages`
Send a message. **Request body must include** `chatId`.

---

### Files

#### `POST /api/upload`
Upload a file. Returns a base64 data URL (no persistent storage).

**Request:** `multipart/form-data` with field `file`.
**Limit:** 10 MB per file.

**Response:**
```json
{
  "url": "data:image/jpeg;base64,/9j/4AAQ...",
  "filename": "photo.jpg",
  "type": "image/jpeg"
}
```

---

### Utility

#### `GET /api/health`
Health check. **Response:** `{"status":"ok"}`

---

## Mobile Support

POLI is mobile-first with full responsive design and PWA support.

### Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile (base) | < 640px | Icon-only bottom nav, single-column layout, compact header |
| `sm` | ≥ 640px | Nav labels visible, 2-column grids |
| `md` | ≥ 768px | 3-column grids, full header branding |
| `lg` | ≥ 1024px | Full desktop layout |

### Mobile UX Features

- **Bottom navigation** — 16-tab icon bar with horizontal scroll, hidden labels on mobile
- **44px tap targets** — All interactive elements meet Apple HIG minimum
- **Viewport-safe dropdowns** — Notification panel constrained to screen width
- **Independent scroll areas** — Each tab content scrolls independently
- **No-scrollbar nav** — Smooth horizontal nav scroll without visible scrollbar
- **Dark mode** — System-aware with manual toggle

### PWA Installation

POLI is installable as a Progressive Web App:

| Platform | Instructions |
|---|---|
| iOS Safari | Share button → "Add to Home Screen" |
| Android Chrome | Three-dot menu → "Install App" / "Add to Home Screen" |
| Desktop Chrome | Install icon in the address bar |

---

## Theming System

POLI includes 35+ real-time switchable themes, accessible from the Profile tab.

### Theme Categories

| Category | Themes |
|---|---|
| Default | Light, Dark |
| Historical | War, Revolution, Steampunk, Retro, Sepia, Noir |
| Nature | Nature, Forest, Ocean, Arctic, Jungle, Desert, Volcanic |
| Technology | Tech, Cyberpunk, Matrix, Neon, Synth |
| Seasonal | Christmas, New Year, Chinese New Year |
| Aesthetic | Royal, Midnight, Vaporwave, Lavender, Velvet, Mint |
| Neutral | Corporate, Steel, Monochrome, Slate, Lunar, Solar, Coffee |

### How Themes Work

Themes apply at the root `Layout` component via dynamic Tailwind class switching plus CSS custom property injection:

```typescript
// Layout.tsx
const themeClasses = useMemo(() => {
  switch (themeMode) {
    case 'War':   return "bg-stone-900 text-stone-300 font-mono border-red-900";
    case 'Matrix': return "bg-black text-green-500 font-mono tracking-widest";
    // ...
  }
}, [themeMode]);

// CSS custom property for accent color
root.style.setProperty('--color-accent', '#ef4444'); // War red
```

Each theme also applies texture overlays (circuit board for Tech, snow for Christmas, etc.) for maximum atmosphere.

---

## Data & Content Pipeline

### Navigation Data vs. AI Content

POLI clearly separates **navigation/taxonomy data** (static, structured, fast) from **content** (always AI-generated):

| Type | Storage | Example |
|---|---|---|
| Navigation | Static TypeScript files | List of 195 countries with names |
| Content | Claude AI (cached in session) | Full 23-module country profile |
| User data | IndexedDB (local browser) | Saved items, chat history |
| Social data | In-memory serverless | Posts and messages (ephemeral) |

### Static Navigation Files
These files contain **only hierarchical menus** — not content. Clicking any item triggers AI generation.

| File | Records | Purpose |
|---|---|---|
| `data/countriesData.ts` | 195 | Country names, regions, ISO codes |
| `data/exploreData.ts` | ~500 | Explore tab hierarchy |
| `data/personsData.ts` | ~400 | Political figures index |
| `data/theoryData.ts` | ~200 | Ideologies and disciplines index |
| `data/archives/massiveHistory.ts` | ~2000 | Historical events for almanac |

### Content Always AI-Generated
No detail page uses static content for its actual body text:
- Country profiles (23 modules, parallel Claude calls)
- Person biographies
- Event analyses
- Organization profiles
- Ideology/discipline deep-dives
- Legal text analyses
- Quiz questions and flashcards
- Daily briefing
- Almanac entries
- Search dossiers
- Comparison reports

---

## Troubleshooting

### AI Content Shows Placeholder Text

**Symptom:** Country shows "Capital City, Unknown Country". Home shows "Aristotle" fallback quote.

**Cause:** `CLAUDE_API_KEY` is not set or invalid.

**Fix:**
1. Vercel: Settings → Environment Variables → Add `CLAUDE_API_KEY`
2. Redeploy (environment variable changes require redeployment on Vercel)
3. Test: Open DevTools → Network → look for failed `/api/ai/generate` calls
4. Check the response body — it will say `"CLAUDE_API_KEY environment variable is not set"`

---

### Country Profile Takes 20+ Seconds

**Cause:** Normal on first load. 23 parallel Claude calls run simultaneously.

**Fix:**
- This is expected behavior on first visit. All subsequent visits are **instant** (session cache hit).
- If this is consistently slow, check your Anthropic account for rate limits.

---

### Images Show as Grey Boxes

**Cause:** Wikimedia Commons URLs generated by Claude occasionally return 404.

**Fix:** The `ImageWithFallback` component automatically retries with `picsum.photos` seed URLs. Grey boxes should resolve within 1–2 seconds as the fallback URL loads.

---

### Vercel Build Fails

```bash
# Test locally before deploying
npm run build

# Check TypeScript errors
npm run lint
```

Common causes: TypeScript errors in component files, missing imports, Node version mismatch.

---

### Streaming Shows "Stream error occurred."

**Cause:** Vercel Hobby plan's 60-second function timeout was hit, or a network interruption occurred.

**Fix:**
- The app retries once automatically before showing the error.
- Shorter/simpler prompts complete faster.
- Upgrade to Vercel Pro for 300-second timeout.

---

### Posts and Messages Disappear After Redeploy

**Cause:** Social data is stored in the serverless function's in-memory state. It resets on cold starts and every redeployment.

**Fix:** For persistent social features, integrate a database:
- **[Vercel KV](https://vercel.com/storage/kv)** — Managed Redis, easiest integration
- **[Vercel Postgres](https://vercel.com/storage/postgres)** — Managed PostgreSQL
- **[Supabase](https://supabase.com)** — PostgreSQL with realtime subscriptions
- **[PlanetScale](https://planetscale.com)** — Serverless MySQL

---

## Roadmap

### Near Term
- [ ] **Persistent storage** — Vercel KV integration for posts and messages
- [ ] **User authentication** — Email/OAuth via Clerk or Vercel Auth
- [ ] **PDF export** — Country profiles and research memos as downloadable PDFs
- [ ] **AI citations** — Automatic source attribution for AI-generated content
- [ ] **Offline support** — Service worker caching for PWA offline mode
- [ ] **Search history** — Track and revisit previous searches

### Medium Term
- [ ] **Elections tracker** — Real-time global election monitoring and analysis
- [ ] **Treaty database** — Full-text treaty search with AI annotation
- [ ] **Real-time news** — Live news API integration with political analysis layer
- [ ] **Data visualizations** — Interactive charts for economic and political data
- [ ] **Public API** — Developer API for political science researchers
- [ ] **Multilingual UI** — Full interface translation (20+ languages)
- [ ] **Mobile apps** — Native iOS and Android via React Native

### Long Term
- [ ] **Collaborative research** — Shared workspaces for academic teams
- [ ] **Predictive modeling** — AI election and stability forecasting
- [ ] **AI debate partner** — Real-time structured debate with AI opponent
- [ ] **Academic publishing** — Export research as formatted academic papers
- [ ] **Institution integration** — University and think tank partnerships

---

## Contributing

Contributions are welcome. Please follow these conventions:

- **TypeScript** — No `any` except in legacy AI response parsing
- **Functional components** — React hooks, no class components
- **Tailwind CSS** — No inline styles, no CSS modules
- **Service pattern** — All AI calls route through `generateWithFallback` in `services/common.ts`
- **Error handling** — All async functions must catch errors and return structured fallback data
- **Mobile-first** — Design for small screens first, then expand with responsive classes

### Development Workflow

```bash
git checkout -b feature/your-feature-name
npm run dev                    # Develop locally
npm run lint                   # Check TypeScript
npm run build                  # Verify production build
git commit -m "feat: describe your change"
# Open a pull request
```

---

*Built with Claude Sonnet (Anthropic) · Deployed on Vercel · Political science for everyone*
