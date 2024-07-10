import { Router } from 'express';

import usersController from '../controllers/users';

const usersRoute = Router();

usersRoute.get('/:id', usersController.getById);

export default usersRoute;
