import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import cookiePaser from "cookie-parser";

import latestRoute from "./routes/latest";
import articlesRoute from "./routes/articles";
import usersRoute from "./routes/users";
import authRoute from "./routes/auth";
import authenticateTokens from "./middleware/auth";

const app = express();
const port = 3001;

app.use(
  cors({
    exposedHeaders: "Authorization",
    origin: true,
    credentials: true, //access-control-allow-credentials:true
  }),
);
app.use(cookiePaser());

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use(morgan("tiny"));

app.use("/auth", authRoute);
app.use("/users", authenticateTokens, usersRoute);
app.use("/latest", latestRoute);
app.use("/articles", articlesRoute);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
