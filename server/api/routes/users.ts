import { Router } from "express";

import usersController from "../controllers/users";

const usersRoute = Router();

usersRoute.get("/:id", usersController.getById);

usersRoute.post("/:id/saves", usersController.saveArticle);

export default usersRoute;
