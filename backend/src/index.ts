import express from 'express';
import cors from 'cors';
import axios from 'axios';
import type { Request, Response } from 'express'
import * as cheerio from 'cheerio';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/scrape', (req: Request, res: Response): void => {
  (async () => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      res.status(400).json({ error: '请提供有效的 url 参数' });
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const html = response.data.toString();
      const match = html.match(/【大纪元[\s\S]*?责任编辑：[^#<]{1,20}#/);
      const content = match ? match[0].trim() : '未能提取正文';

      res.json({ content });
    } catch (err) {
      res.status(500).json({ error: '抓取失败', details: (err as Error).message });
    }
  })();
});

app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});