import { Request, Response, Router } from 'express';
import AppError from '@shared/errors/AppError';
import CreateSessionService from '@modules/Users/services/CreateSessionService';
import { container } from 'tsyringe';

const sessionRouter = Router();

sessionRouter.post('/', async (request:Request, response:Response) => {
  const { cpf_cnpj, password } = request.body;
  if (!cpf_cnpj || !password) {
    throw new AppError('Os campos cpf_cnpj e senha são obrigatórios', 401);
  }

  const createSessionService = container.resolve(CreateSessionService);
  const data = await createSessionService.execute(cpf_cnpj, password);

  return response.status(200).json(data);
});

export default sessionRouter;
