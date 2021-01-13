import { Router } from 'express';
import authenticationMiddleware from '@modules/Users/infra/http/middlewares/authenticationMiddleware';

import CompanyController from '../controllers/CompanyController';

const companyRouter = Router();

const companyController = new CompanyController();

companyRouter.get('/', authenticationMiddleware, companyController.show);

export default companyRouter;
