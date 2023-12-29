import 'dotenv/config';

import cors from 'cors';
import express from 'express';



import Latest from '../controllers/latest';
import Popular from '../controllers/popular';
import Platform from '../controllers/platform';
import { fetchExplore, fetchPost } from '../controllers/explore';



const app = express();
const port = 3001;

app.use(cors());

app.get('/post', fetchPost);
app.get('/platform', Platform);
app.get('/latest', Latest.fetch);
app.get('/explore', fetchExplore);
app.get('/popular', Popular.fetch);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
