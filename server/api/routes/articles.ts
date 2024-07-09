import { Router } from 'express';
import articlesController from '../controllers/articles';

const articlesRoute = Router();

articlesRoute.get('/', articlesController.getAll);
articlesRoute.get('/:id', articlesController.getById);

export default articlesRoute;
