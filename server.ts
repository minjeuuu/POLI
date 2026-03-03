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

// --- IN-MEMORY DATA STORE (For Real-Time Demo) ---
let messages: any[] = [];
let posts: any[] = [];

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
            // SPA fallback - send index.html for all non-API routes
            app.get('*', (req, res) => {
                if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
                    res.sendFile(path.join(distPath, 'index.html'));
                }
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
