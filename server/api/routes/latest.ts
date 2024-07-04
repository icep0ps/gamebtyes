import { Router } from 'express';
import latestController from '../controllers/latest';

const latestRoute = Router();

latestRoute.get('/', latestController.get);

export default latestRoute;
