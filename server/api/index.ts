import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import latestRoute from './routes/latest';
import articlesRoute from './routes/articles';
import usersRoute from './routes/users';

const app = express();
const port = 3001;
const jsonParser = bodyParser.json();

app.use(cors());

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(morgan('tiny'));

app.use('/latest', latestRoute);
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
