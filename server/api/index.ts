import 'dotenv/config';
import cors from 'cors';
import express, { type Request, type Response } from 'express';

import scrapPlatfromNews from './scrappers/platform';
import scrapLatestArticles from './scrappers/latest';
import scrapPopularArticles from './scrappers/popular';

const app = express();
const port = 3001;

app.use(cors());

app.get('/popular', async (req: Request, res: Response) => {
  const data = await scrapPopularArticles();
  res.json(data);
});

app.get('/latest', async (req: Request, res: Response) => {
  const data = await scrapLatestArticles();
  res.json(data);
});

app.get('/platform', async (req: Request, res: Response) => {
  const params = req.query;
  const data = await scrapPlatfromNews(params);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
