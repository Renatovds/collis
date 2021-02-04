import path from 'path';
import dotenv from 'dotenv';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { container } from 'tsyringe';
import UpdateCachePlans from '@shared/infra/services/UpdateCachePlans';
import routes from './routes/index';

import AppError from './shared/errors/AppError';
import '@shared/Container/index';
import UpdateCacheService from './modules/Bonds/services/UpdateCacheService';

// dotenv.config({ path: path.join('..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json(err.message);
    }

    response.status(500).json('Internal Server Error');
  },
);
createConnection('default').then(() => {
  const updateCacheService = container.resolve(UpdateCacheService);
  const updateCachePlans = container.resolve(UpdateCachePlans);
  updateCacheService.execute();
  updateCachePlans.execute();
}).catch((err) => console.log(err));

app.listen(3333, () => console.log('servidor iniciado na porta 3333'));
