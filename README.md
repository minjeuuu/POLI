# POLI

A political science research platform for exploring countries, theories, thinkers, and global discourse — powered by AI-driven content generation and real-time collaboration.

## Features

- **Country Explorer** — Detailed profiles with flags, maps, anthems, symbols, geography, and history for every nation
- **Global Discourse** — A real-time social feed for academic analysis, polls, debates, and video content
- **AI Lab** — Dual-engine AI assistant using Claude (Anthropic) and Gemini (Google DeepMind) for political analysis and research
- **Messages** — Real-time messaging with WebRTC audio and video calling
- **Saved Archive** — Bookmark countries, posts, and research for later

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS
- **Backend**: Express 5, Socket.IO 4 (real-time messaging + WebRTC signaling)
- **AI**: Claude (Anthropic) + Gemini (Google) — dual-engine with automatic fallback
- **Media**: WebRTC with STUN servers for peer-to-peer audio/video calls

## Getting Started

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```sh
   npm install
   ```

2. Copy the environment template and fill in your API keys:
   ```sh
   cp .env.example .env
   ```
   Required variables:
   - `GEMINI_API_KEY` — [Google AI Studio](https://aistudio.google.com)
   - `VITE_CLAUDE_API_KEY` — [Anthropic Console](https://console.anthropic.com)

3. Start the development server:
   ```sh
   npm run dev
   ```

The app runs at `http://localhost:5173` in development mode with hot module replacement.

## Production

Build and serve the production bundle:

```sh
npm run build
npm start
```

Or use the included Dockerfile:

```sh
docker build -t poli .
docker run -p 3000:3000 --env-file .env poli
```

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (primary AI engine) |
| `VITE_CLAUDE_API_KEY` | Anthropic Claude API key (secondary AI engine) |
| `PORT` | Server port (default: `3000`) |
| `NODE_ENV` | Set to `production` to serve the built frontend |
