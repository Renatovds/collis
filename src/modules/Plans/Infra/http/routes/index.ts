import { Router } from 'express';
import authenticationMiddleware from '@modules/Users/infra/http/middlewares/authenticationMiddleware';

import PlansController from '../controllers/PlansController';

const plansRouter = Router();

const plansController = new PlansController();

plansRouter.get('/', authenticationMiddleware, plansController.show);

export default plansRouter;
