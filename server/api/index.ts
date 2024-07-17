import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import latestRoute from './routes/latest';
import articlesRoute from './routes/articles';
import usersRoute from './routes/users';
import authRoute from './routes/auth';

const app = express();
const port = 3001;

app.use(cors());

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(morgan('tiny'));

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/latest', latestRoute);
app.use('/articles', articlesRoute);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
