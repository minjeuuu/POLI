import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Additional API routes check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/log-error', (req, res) => {
    console.error("BROWSER ERROR REPORTED:", req.body);
    res.sendStatus(200);
  });

  app.get('/api/posts', (req, res) => {
    res.json([]);
  });
  
  app.post('/api/posts', (req, res) => {
    res.json({ success: true, id: Date.now() });
  });

  app.post('/api/posts/:id/like', (req, res) => {
    res.json({ success: true });
  });

  app.post('/api/posts/:id/comment', (req, res) => {
    res.json({ success: true });
  });

  app.get('/api/messages/:id', (req, res) => {
    res.json([]);
  });

  app.post('/api/upload', (req, res) => {
    res.json({ url: 'https://via.placeholder.com/150' });
  });

  app.get('/api/news', (req, res) => {
    res.json([]);
  });

  app.get('/api/open-data', (req, res) => {
    res.json({ results: [] });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
