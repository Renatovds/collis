import { Router } from 'express';
import authenticationMiddleware from '@modules/Users/infra/http/middlewares/authenticationMiddleware';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.put('/update', authenticationMiddleware, usersController.update);

export default usersRouter;
