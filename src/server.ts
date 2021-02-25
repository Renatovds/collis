import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { container } from 'tsyringe';
import connection from '@shared/infra/database/index';
import UpdateCachePlans from '@shared/infra/services/UpdateCachePlans';
import routes from './routes/index';
import AppError from './shared/errors/AppError';
import '@shared/Container/index';
import UpdateCacheService from './modules/Bonds/services/UpdateCacheService';
import rateLimiter from './shared/infra/middlewares/RateLimiter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json(err.message);
    } else {
      response.status(500).json('Internal Server Error');
    }
  },
);

connection();

// Intervalo de Atualização do Servidor
setInterval(() => {
  const date = new Date();

  if (date.getHours() === 9) {
    const updateCacheService = container.resolve(UpdateCacheService);
    const updateCachePlans = container.resolve(UpdateCachePlans);
    updateCacheService.execute();
    updateCachePlans.execute();
  }
}, 1800000);

app.listen(3333, () => console.log('servidor iniciado na porta 3333'));
