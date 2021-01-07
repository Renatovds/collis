import { Router } from 'express';
import authenticationMiddleware from '@modules/Users/infra/http/middlewares/authenticationMiddleware';
import ShowDetalhedBondController from '../Controllers/ShowDetalhedBondController';
import BondsController from '../Controllers/BondsController';

const bondsRouter = Router();

const bondsController = new BondsController();
const showDetalhedBond = new ShowDetalhedBondController();

bondsRouter.get('/', authenticationMiddleware, bondsController.show);
bondsRouter.post('/:bond', authenticationMiddleware, showDetalhedBond.show);

export default bondsRouter;
