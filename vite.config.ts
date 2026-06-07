import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['icon.svg'],
          workbox: {
            maximumFileSizeToCacheInBytes: 5000000
          },
          manifest: {
            name: 'POLI',
            short_name: 'POLI',
            description: 'Political Academic Tool',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone',
            icons: [
              {
                src: '/icon.svg',
                sizes: '192x192 512x512',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              }
            ],
            shortcuts: [
              { name: "Global Hub", short_name: "Hub", description: "Open Data Hub", url: "/?tab=hub", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Live Markets", short_name: "Markets", description: "Political Markets", url: "/?tab=rates", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Explore Nations", short_name: "Nations", description: "Database of Nations", url: "/?tab=countries", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Learn Theory", short_name: "Theory", description: "Political Theory", url: "/?tab=theory", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Daily Almanac", short_name: "Almanac", description: "Daily Events", url: "/?tab=almanac", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Comparative DB", short_name: "Compare", description: "Compare Entities", url: "/?tab=comparative", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Political Sim", short_name: "Sim", description: "Simulation", url: "/?tab=sim", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Policy Games", short_name: "Games", description: "Interactive Games", url: "/?tab=games", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Flashcards", short_name: "Learn", description: "Learn Terms", url: "/?tab=learn", icons: [{ src: "/icon.svg", sizes: "192x192" }] },
              { name: "Library", short_name: "Read", description: "Document Library", url: "/?tab=read", icons: [{ src: "/icon.svg", sizes: "192x192" }] }
            ],
            widgets: [
              { name: "Market Rates Tracker", short_name: "Rates", description: "Live tracking of political prediction markets", tag: "rates_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Global Nations Brief", short_name: "Nations", description: "Quick stats on selected nations", tag: "nations_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Daily Theory Concept", short_name: "Theory Tracker", description: "Learn a new theory daily", tag: "theory_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Historical Almanac", short_name: "Almanac", description: "Today in political history", tag: "almanac_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Election Countdown", short_name: "Elections", description: "Countdown to major global elections", tag: "election_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Policy Simulator Stats", short_name: "Sim Stats", description: "Your latest simulation outcomes", tag: "sim_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Live Approval Ratings", short_name: "Approval", description: "Global leader approval tracking", tag: "approval_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Trending Legislature", short_name: "Bills", description: "Hot bills in parliaments globally", tag: "bills_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Geopolitical Alert Monitor", short_name: "Alerts", description: "Live flashpoints", tag: "alerts_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Economic Indexes", short_name: "Economy", description: "Key inflation/GDP trackers", tag: "econ_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Supreme Court Rulings", short_name: "Courts", description: "Latest judicial updates", tag: "courts_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Climate Accord Tracker", short_name: "Climate", description: "Environmental policy tracking", tag: "climate_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Defense Spending Monitor", short_name: "Defense", description: "Global military budgets", tag: "defense_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Voter Turnout Insights", short_name: "Turnout", description: "Demographic breakdowns", tag: "turnout_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Diplomatic Visit Log", short_name: "Diplomacy", description: "Head of state travels", tag: "diplomacy_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Treaty Watchlist", short_name: "Treaties", description: "International agreements", tag: "treaties_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Democracy Index Panel", short_name: "Democracy", description: "Global freedom ratings", tag: "democracy_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Currency Sanctions", short_name: "Sanctions", description: "Global economic sanctions", tag: "sanctions_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "Political Spectrum Quiz", short_name: "Spectrum", description: "Daily alignment questions", tag: "spectrum_widget", ms_ac_h_store_logo: "/icon.svg" },
              { name: "United Nations SDG Monitor", short_name: "UN SDG", description: "Development goals progress", tag: "sdg_widget", ms_ac_h_store_logo: "/icon.svg" }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
