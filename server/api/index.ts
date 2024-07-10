import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import latestRoute from './routes/latest';
import articlesRoute from './routes/articles';
import usersRoute from './routes/users';

const app = express();
const port = 3001;

app.use(cors());

app.use('/latest', latestRoute);
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
