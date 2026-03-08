# ── Stage 1: Build frontend ─────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# Build the React frontend → produces /app/dist
RUN npm run build

# ── Stage 2: Production image ────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only what production needs
COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev

# Install tsx globally for running TypeScript server
RUN npm install -g tsx

# Copy compiled frontend and server source
COPY --from=builder /app/dist ./dist
COPY server.ts ./
COPY tsconfig.json ./
COPY services ./services
COPY utils ./utils
COPY types.ts ./
COPY types ./types
COPY constants.ts ./

# Uploads dir (mount a persistent volume over this in production)
RUN mkdir -p uploads

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Health check so the platform knows when the app is ready
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["tsx", "server.ts"]
