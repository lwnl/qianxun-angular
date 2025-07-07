import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import axios from 'axios';
import { extractContent } from './utils/extractContent';
import { connectDB } from './lib/mongoose';
import { NewsModel } from './models/News';

const app = express();
const PORT = 3100;

app.use(cors());
app.use(cookieParser());
app.use(express.json())

// 连接数据库
connectDB()

// 获取新闻列表
app.get('/api/news-list', async (req: Request, res: Response) => {
  try {
    const newsList = await NewsModel.find().sort({ createdAt: -1 })
    res.status(200).json({
      data: newsList,
      message: '新闻列表加载成功'
    })
  } catch (error) {
    console.error('获取新闻列表失败', error)
    res.status(500).json({
      error: (error as Error).message || '服务器错误'
    });
  }
})

// 获取单条新闻
app.get('/api/news/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const news = await NewsModel.findOne({ id: Number(id) })
    if (!news) {
      res.status(404).json({
        error: '没有该新闻'
      })
    }
    res.status(200).json({
      data: news
    })
  } catch (error) {
    console.error('获取新闻失败', error)
    res.status(500).json({
      error: (error as Error).message || '服务器错误'
    });
  }
})

// 获取单条新闻的具体内容
app.post('/api/scrape', async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;

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
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});