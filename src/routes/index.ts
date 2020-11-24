import { Router } from 'express';
import testRouter from '../modules/test/infra/http/routes';

const routes = Router();

routes.use('/teste', testRouter);
export default routes;
