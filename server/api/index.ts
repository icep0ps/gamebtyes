import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import userRouter from './routes/users';

import Latest from '../controllers/latest';
import Popular from '../controllers/popular';
import Platform from '../controllers/platform';
import { fetchExplore, fetchPost } from '../controllers/explore';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/post', fetchPost);
app.get('/platform', Platform);
app.get('/latest', Latest.fetch.bind(Latest));
app.get('/explore', fetchExplore);
app.get('/popular', Popular.fetch);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
