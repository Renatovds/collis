import { Router } from 'express';
import TestController from '../Controllers/TestControllers/TestController';

const testRouter = Router();

const testController = new TestController();

testRouter.get('/', testController.create);

export default testRouter;
