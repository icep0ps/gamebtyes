import 'dotenv/config';
import cors from 'cors';

import express, { type Request, type Response } from 'express';
import { ExploreSearchParams, FiltersSearchParams } from '../types';

import Popular from '../controllers/popular';
import Latest from '../controllers/latest';
import Explore from '../controllers/explore';
import Platform from '../controllers/platform';

const app = express();
const port = 3001;

app.use(cors());

app.get('/popular', async (request: Request, response: Response) => {
  const data = await new Popular(
    `${process.env.POPULAR_NEWS_SITE_BASE_URL}/pc?filter=articles`
  ).fetch();

  response.set({
    'Cache-Control': 'private, max-age=604800',
  });

  response.json(data);
});

app.get('/latest', async (request: Request, response: Response) => {
  try {
    const data = await new Latest(
      `${process.env.LATESET_NEWS_SITE_BASE_URL}/uk/news/`
    ).fetch();
    response.set({
      'Cache-Control': 'private, max-age=604800',
    });

    response.json(data);
  } catch (error) {
    response.statusCode = 500;
    response.json({
      msg: 'Failed to get lastest: ' + error,
    });
  }
});

app.get(
  '/platform',
  async (request: Request<{}, {}, {}, FiltersSearchParams>, response: Response) => {
    const params = request.query;

    if (params) {
      const searchparams = new URLSearchParams(params);
      const data = await new Platform(
        `${process.env.LATESET_NEWS_SITE_BASE_URL}/uk/search/?${searchparams}`
      ).fetch();
      return response.json(data);
    }

    return response.json({ msg: 'could not find data' });
  }
);

app.get(
  '/explore',
  async (request: Request<{}, {}, {}, ExploreSearchParams>, response: Response) => {
    try {
      const params = request.query;
      const searchparams = new URLSearchParams(params);
      const data = await new Explore(
        `${process.env.EXPLORE_NEWS_BASE_URL}/gaming/?${searchparams}`
      ).fetch();
      response.json(data);
    } catch (error) {
      response.statusCode = 500;
      response.json({ msg: 'could not find data' });
    }
  }
);

app.get(
  '/post',
  async (request: Request<{}, {}, {}, ExploreSearchParams>, response: Response) => {
    try {
      const sitelink = request.query.sitelink;
      const data = await new Explore(
        `${process.env.EXPLORE_NEWS_BASE_URL}/gaming/`
      ).fetchContent({ link: sitelink });
      response.json(data);
    } catch (error) {
      response.statusCode = 500;
      response.json({ msg: 'could not find data' });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
