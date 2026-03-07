import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Memory storage for Vercel (no persistent filesystem)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
});

// --- IN-MEMORY DATA STORE (seed data always available) ---
let messages: any[] = [];
let posts: any[] = [
    {
        id: 'seed-1',
        type: 'Analysis',
        title: 'The Shifting Balance of Multilateral Power',
        author: { name: 'Dr. Amara Diallo', credential: 'Political Scientist', handle: '@amara_diallo', avatar: 'AD', verified: true },
        timestamp: '2 hours ago',
        content: 'The post-unipolar moment is now undeniable. Regional powers are asserting influence in ways that fundamentally reshape the calculus of international relations, from West Africa to the South China Sea.',
        fullContent: 'The post-unipolar moment is now undeniable. Regional powers are asserting influence in ways that fundamentally reshape the calculus of international relations, from West Africa to the South China Sea. This structural shift demands new analytical frameworks beyond classical realism and liberal institutionalism.',
        discipline: 'IR Theory',
        region: 'Global',
        citations: [{ title: 'After Hegemony', author: 'Keohane, R.' }],
        reactions: { valid: 47, disputed: 8, citationNeeded: 3, hearts: 124 },
        comments: [
            { id: 'c1', user: 'Prof. Chen', text: 'Excellent framing. The minilateral trend is particularly striking in the Indo-Pacific.', timestamp: '1 hour ago', likes: 12 }
        ],
        tags: ['Geopolitics', 'Multilateralism', 'IR Theory'],
    },
    {
        id: 'seed-2',
        type: 'Theory',
        title: 'Democratic Backsliding and the Limits of Conditionality',
        author: { name: 'Prof. Isabella Russo', credential: 'Comparative Politics', handle: '@irusso_pol', avatar: 'IR', verified: true },
        timestamp: '5 hours ago',
        content: 'External conditionality mechanisms have proven remarkably ineffective against democratic erosion driven by elected incumbents. Hungary, Tunisia, and Georgia illustrate a common pattern.',
        fullContent: 'External conditionality mechanisms have proven remarkably ineffective against democratic erosion driven by elected incumbents. Hungary, Tunisia, and Georgia illustrate a common pattern: the procedural shell of democracy hollowed out from within.',
        discipline: 'Comparative Politics',
        region: 'Europe',
        citations: [{ title: 'How Democracies Die', author: 'Levitsky & Ziblatt' }],
        reactions: { valid: 89, disputed: 12, citationNeeded: 5, hearts: 203 },
        comments: [],
        tags: ['Democracy', 'Backsliding', 'Europe'],
    },
    {
        id: 'seed-3',
        type: 'Poll',
        title: 'Which factor most threatens liberal international order?',
        author: { name: 'POLI Research Hub', credential: 'Academic Platform', handle: '@poli_research', avatar: 'PR', verified: true },
        timestamp: '8 hours ago',
        content: 'Great power competition, populist nationalism, or technological fragmentation — which poses the greatest systemic risk to the rules-based international order?',
        fullContent: 'The liberal international order faces compound challenges. Cast your vote and share your reasoning.',
        discipline: 'IR Theory',
        region: 'Global',
        citations: [],
        reactions: { valid: 156, disputed: 0, citationNeeded: 0, hearts: 87 },
        comments: [],
        tags: ['LIO', 'IR', 'Poll'],
        poll: {
            options: [
                { text: 'Great Power Competition', votes: 412 },
                { text: 'Populist Nationalism', votes: 289 },
                { text: 'Technological Fragmentation', votes: 198 },
                { text: 'Climate-driven Instability', votes: 156 },
            ],
            totalVotes: 1055,
        },
    },
];

// --- UPLOAD ---
app.post('/api/upload', upload.single('file'), (req: any, res: any) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const base64 = req.file.buffer.toString('base64');
    const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
    res.json({ url: dataUrl, filename: req.file.originalname, type: req.file.mimetype });
});

// --- MESSAGES ---
app.get('/api/messages/:chatId', (req: any, res: any) => {
    const chatMessages = messages.filter(m => m.chatId === req.params.chatId);
    res.json(chatMessages);
});

app.post('/api/messages', (req: any, res: any) => {
    const msg = req.body;
    messages.push(msg);
    res.json(msg);
});

// --- POSTS ---
app.get('/api/posts', (_req: any, res: any) => {
    res.json(posts);
});

app.post('/api/posts', (req: any, res: any) => {
    const post = req.body;
    posts.unshift(post);
    res.json(post);
});

app.post('/api/posts/:id/like', (req: any, res: any) => {
    const idx = posts.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts[idx] = { ...posts[idx], reactions: { ...posts[idx].reactions, hearts: (posts[idx].reactions?.hearts || 0) + 1 } };
    res.json(posts[idx]);
});

app.post('/api/posts/:id/comment', (req: any, res: any) => {
    const idx = posts.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts[idx].comments = [...(posts[idx].comments || []), req.body];
    res.json(posts[idx]);
});

// --- HEALTH ---
app.get('/api/health', (_req: any, res: any) => {
    res.json({ status: 'ok' });
});

// --- CLAUDE AI PROXY ---
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || process.env.VITE_CLAUDE_API_KEY || '';
const CLAUDE_BASE_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-6';
const CLAUDE_MAX_TOKENS = 16000;
const CLAUDE_SYSTEM =
    'You are POLI, an expert encyclopedic political science, geopolitics, history, culture, and global knowledge AI. Provide exhaustive, accurate, real-world data. When asked for JSON, return ONLY valid JSON — no markdown fences, no preamble, no commentary. Start directly with { or [. Fill every field with specific, detailed information.';

app.post('/api/ai/generate', async (req: any, res: any) => {
    if (!CLAUDE_API_KEY) return res.status(503).json({ error: 'Claude API key not configured on server.' });
    const { prompt, system, maxTokens } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });
    try {
        const upstream = await fetch(CLAUDE_BASE_URL, {
            method: 'POST',
            headers: { 'x-api-key': CLAUDE_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: maxTokens || CLAUDE_MAX_TOKENS,
                system: system || CLAUDE_SYSTEM,
                messages: [{ role: 'user', content: prompt }],
            }),
        });
        const data = (await upstream.json()) as any;
        if (!upstream.ok) return res.status(upstream.status).json({ error: data?.error?.message || 'Claude API error' });
        res.json({ text: data.content?.[0]?.text || '' });
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal proxy error' });
    }
});

app.post('/api/ai/stream', async (req: any, res: any) => {
    if (!CLAUDE_API_KEY) { res.status(503).json({ error: 'Claude API key not configured on server.' }); return; }
    const { prompt, system } = req.body || {};
    if (!prompt) { res.status(400).json({ error: 'prompt is required' }); return; }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const flush = () => { if (typeof (res as any).flush === 'function') (res as any).flush(); };
    const write = (msg: string) => { res.write(msg); flush(); };

    try {
        const upstream = await fetch(CLAUDE_BASE_URL, {
            method: 'POST',
            headers: { 'x-api-key': CLAUDE_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: CLAUDE_MAX_TOKENS,
                stream: true,
                system: system || CLAUDE_SYSTEM,
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        if (!upstream.ok || !upstream.body) { write('data: [ERROR]\n\n'); res.end(); return; }

        const decoder = new TextDecoder();
        let buffer = '';
        for await (const chunk of upstream.body as any) {
            buffer += decoder.decode(chunk instanceof Uint8Array ? chunk : Buffer.from(chunk), { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const raw = line.slice(6).trim();
                if (raw === '[DONE]') { write('data: [DONE]\n\n'); res.end(); return; }
                try {
                    const parsed = JSON.parse(raw);
                    const text = parsed.delta?.text;
                    if (text) write(`data: ${JSON.stringify({ text })}\n\n`);
                } catch { /* skip */ }
            }
        }
        write('data: [DONE]\n\n');
        res.end();
    } catch (e: any) {
        write('data: [ERROR]\n\n');
        res.end();
    }
});

export default app;
