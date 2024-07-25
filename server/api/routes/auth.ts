import { Router } from "express";
import authController from "../controllers/auth";

const authRoute = Router();

//google auth form goes to this url when it auths user
authRoute.get("/oauth2callback", authController.googleAuth);

// takes user to google aut form
authRoute.post("/", authController.authPrompt);

authRoute.post("/logout", authController.logUserOut);
export default authRoute;
