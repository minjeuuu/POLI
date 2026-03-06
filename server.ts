import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = parseInt(process.env.PORT || '3000', 10);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/uploads', express.static(uploadDir));

// --- IN-MEMORY DATA STORE ---
let messages: any[] = [];
let posts: any[] = [
    {
        id: 'seed-1',
        type: 'Analysis',
        title: 'The Shifting Balance of Multilateral Power',
        author: { name: 'Dr. Amara Diallo', credential: 'Political Scientist', handle: '@amara_diallo', avatar: 'AD', verified: true },
        timestamp: '2 hours ago',
        content: 'The post-unipolar moment is now undeniable. Regional powers are asserting influence in ways that fundamentally reshape the calculus of international relations, from West Africa to the South China Sea.',
        fullContent: 'The post-unipolar moment is now undeniable. Regional powers are asserting influence in ways that fundamentally reshape the calculus of international relations, from West Africa to the South China Sea. This structural shift demands new analytical frameworks beyond classical realism and liberal institutionalism. The rise of minilateral arrangements — AUKUS, the Quad, I2U2 — signals a preference for bespoke coalitions over unwieldy multilateral bodies, reflecting a deeper skepticism about universal governance architectures.',
        discipline: 'IR Theory',
        region: 'Global',
        citations: [{ title: 'After Hegemony', author: 'Keohane, R.' }],
        reactions: { valid: 47, disputed: 8, citationNeeded: 3, hearts: 124 },
        comments: [
            { id: 'c1', user: 'Prof. Chen', text: 'Excellent framing. The minilateral trend is particularly striking in the Indo-Pacific.', timestamp: '1 hour ago', likes: 12 }
        ],
        tags: ['Geopolitics', 'Multilateralism', 'IR Theory']
    },
    {
        id: 'seed-2',
        type: 'Theory',
        title: 'Democratic Backsliding and the Limits of Conditionality',
        author: { name: 'Prof. Isabella Russo', credential: 'Comparative Politics', handle: '@irusso_pol', avatar: 'IR', verified: true },
        timestamp: '5 hours ago',
        content: 'External conditionality mechanisms have proven remarkably ineffective against democratic erosion driven by elected incumbents. Hungary, Tunisia, and Georgia illustrate a common pattern: the procedural shell of democracy hollowed out from within.',
        fullContent: 'External conditionality mechanisms have proven remarkably ineffective against democratic erosion driven by elected incumbents. Hungary, Tunisia, and Georgia illustrate a common pattern: the procedural shell of democracy hollowed out from within. What distinguishes contemporary autocratization from classic coups is its legalistic veneer — using constitutions, courts, and elections as instruments of consolidation rather than constraint. The EU\'s Article 7 mechanism has been rendered toothless by unanimity requirements, while IMF conditionality rarely touches governance quality.',
        discipline: 'Comparative Politics',
        region: 'Europe',
        citations: [{ title: 'How Democracies Die', author: 'Levitsky & Ziblatt' }],
        reactions: { valid: 89, disputed: 12, citationNeeded: 5, hearts: 203 },
        comments: [],
        tags: ['Democracy', 'Backsliding', 'Europe']
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
                { text: 'Climate-driven Instability', votes: 156 }
            ],
            totalVotes: 1055
        }
    }
];

// --- API ROUTES ---

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.originalname, type: req.file.mimetype });
});

app.get('/api/messages/:chatId', (req, res) => {
    const chatId = req.params.chatId;
    const chatMessages = messages.filter(m => m.chatId === chatId);
    res.json(chatMessages);
});

app.post('/api/messages', (req, res) => {
    const msg = req.body;
    messages.push(msg);
    io.to(msg.chatId).emit('receive_message', msg);
    res.json(msg);
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const post = req.body;
    posts.unshift(post);
    io.emit('new_post', post);
    res.json(post);
});

app.post('/api/posts/:id/like', (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].likes += 1;
        io.emit('update_post', posts[postIndex]);
        res.json(posts[postIndex]);
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/api/posts/:id/comment', (req, res) => {
    const postId = req.params.id;
    const comment = req.body;
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].comments.push(comment);
        io.emit('update_post', posts[postIndex]);
        res.json(posts[postIndex]);
    } else {
        res.status(404).send('Post not found');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mode: IS_PRODUCTION ? 'production' : 'development' });
});

// --- CLAUDE AI PROXY ---
// Keeps the API key server-side (never exposed in the browser bundle).
// Browser calls POST /api/ai/generate instead of Anthropic directly.
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || process.env.VITE_CLAUDE_API_KEY || '';
const CLAUDE_BASE_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-6';
const CLAUDE_MAX_TOKENS = 16000;
const CLAUDE_SYSTEM = "You are POLI, an expert encyclopedic political science, geopolitics, history, culture, and global knowledge AI. Provide exhaustive, accurate, real-world data. When asked for JSON, return ONLY valid JSON — no markdown fences, no preamble, no commentary. Start directly with { or [. Fill every field with specific, detailed information.";

app.post('/api/ai/generate', async (req: any, res: any) => {
    if (!CLAUDE_API_KEY) {
        return res.status(503).json({ error: 'Claude API key not configured on server.' });
    }
    const { prompt, system, maxTokens } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });

    try {
        const upstream = await fetch(CLAUDE_BASE_URL, {
            method: 'POST',
            headers: {
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: maxTokens || CLAUDE_MAX_TOKENS,
                system: system || CLAUDE_SYSTEM,
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        const data = await upstream.json() as any;
        if (!upstream.ok) {
            console.error('Claude upstream error:', data);
            return res.status(upstream.status).json({ error: data?.error?.message || 'Claude API error' });
        }
        res.json({ text: data.content?.[0]?.text || '' });
    } catch (e: any) {
        console.error('Claude proxy error:', e);
        res.status(500).json({ error: e.message || 'Internal proxy error' });
    }
});

// Streaming variant — returns Server-Sent Events from Claude
app.post('/api/ai/stream', async (req: any, res: any) => {
    if (!CLAUDE_API_KEY) {
        res.status(503).json({ error: 'Claude API key not configured on server.' });
        return;
    }
    const { prompt, system } = req.body || {};
    if (!prompt) { res.status(400).json({ error: 'prompt is required' }); return; }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        const upstream = await fetch(CLAUDE_BASE_URL, {
            method: 'POST',
            headers: {
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: CLAUDE_MAX_TOKENS,
                stream: true,
                system: system || CLAUDE_SYSTEM,
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        if (!upstream.ok || !upstream.body) {
            res.write('data: [ERROR]\n\n');
            res.end();
            return;
        }

        const reader = (upstream.body as any).getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((l: string) => l.startsWith('data: '));
            for (const line of lines) {
                const raw = line.slice(6);
                if (raw === '[DONE]') { res.write('data: [DONE]\n\n'); res.end(); return; }
                try {
                    const parsed = JSON.parse(raw);
                    const text = parsed.delta?.text;
                    if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
                } catch { /* skip malformed */ }
            }
        }
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (e: any) {
        console.error('Claude stream proxy error:', e);
        res.write('data: [ERROR]\n\n');
        res.end();
    }
});

// --- SOCKET.IO HANDLERS ---
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_chat', (chatId) => {
        socket.join(chatId);
    });

    socket.on('send_message', (msg) => {
        messages.push(msg);
        io.to(msg.chatId).emit('receive_message', msg);
    });

    socket.on('typing', (data) => {
        socket.to(data.chatId).emit('user_typing', data);
    });

    // WebRTC call signaling relay
    socket.on('call-offer', (data) => {
        socket.to(data.chatId).emit('call-offer', data);
    });

    socket.on('call-answer', (data) => {
        socket.to(data.chatId).emit('call-answer', data);
    });

    socket.on('call-ice-candidate', (data) => {
        socket.to(data.chatId).emit('call-ice-candidate', data);
    });

    socket.on('call-ended', (data) => {
        socket.to(data.chatId).emit('call-ended', data);
    });

    socket.on('call-declined', (data) => {
        socket.to(data.chatId).emit('call-declined', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// --- SERVER START ---
async function startServer() {
    if (IS_PRODUCTION) {
        // Serve pre-built static files in production
        const distPath = path.join(process.cwd(), 'dist');
        if (fs.existsSync(distPath)) {
            app.use(express.static(distPath));
            // SPA fallback - send index.html for all non-API routes (Express v5 syntax)
            app.get(/^(?!\/api|\/uploads).*$/, (req, res) => {
                res.sendFile(path.join(distPath, 'index.html'));
            });
            console.log(`POLI serving production build from ${distPath}`);
        } else {
            console.warn('Production build not found. Run "npm run build" first.');
            process.exit(1);
        }
    } else {
        // Use Vite dev middleware in development
        const { createServer: createViteServer } = await import('vite');
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
        console.log(`POLI running in development mode`);
    }

    httpServer.listen(PORT, "0.0.0.0", () => {
        console.log(`POLI server running on http://localhost:${PORT}`);
    });
}

startServer();
