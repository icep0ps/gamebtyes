import { Router } from 'express';
import authController from '../controllers/auth';

const authRoute = Router();
authRoute.get('/oauth2callback', authController.googleAuth);

authRoute.post('/', authController.authPrompt);

export default authRoute;
