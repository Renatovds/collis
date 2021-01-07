import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/authConfig';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default async function authenticationMiddleware(
  request:Request, response:Response, next:NextFunction,
):Promise<void> {
  const authToken = request.headers.authorization;
  console.log(authToken);
  if (!authToken) {
    throw new AppError('Token JWT is missing', 401);
  }

  const [, token] = authToken.split(' ');
  console.log(token);
  try {
    const decoded = verify(token, authConfig.JWT.secret);
    console.log(decoded);
    const { sub } = decoded as ITokenPayload;

    request.user = { id: sub };

    return next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}
