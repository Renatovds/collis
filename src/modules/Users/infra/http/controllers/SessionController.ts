import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateSessionService from '@modules/Users/services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf_cnpj, password } = request.body;
    if (!cpf_cnpj || !password) {
      throw new AppError('Os campos cpf_cnpj e senha são obrigatórios', 401);
    }

    const createSessionService = container.resolve(CreateSessionService);
    const data = await createSessionService.execute(cpf_cnpj, password);

    return response.status(200).json(data);
  }
}

export default SessionController;
