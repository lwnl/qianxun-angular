import express from 'express';
import cors from 'cors';
import axios from 'axios';
import type { Request, Response } from 'express'
import { extractContent } from './utils/extractContent';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/scrape', async (req: Request, res: Response): Promise<void> => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: '请提供有效的 url 参数' });
    return;
  }

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const content = extractContent(response.data.toString());
    res.json({ content });
  } catch (err) {
    res.status(500).json({
      error: '抓取失败',
      details: (err as Error).message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});