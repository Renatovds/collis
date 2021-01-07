import { Router } from 'express';
import sessionRouter from '@modules/Users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import passwordRouter from '@modules/Users/infra/http/routes/password.routes';

import bondsRouter from '@modules/Bonds/infra/http/routes/index';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/passwords', passwordRouter);
routes.use('/bonds', bondsRouter);
export default routes;
