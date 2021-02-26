import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateSessionService from '@modules/Users/services/CreateSessionService';
import UpdateUserDataServerSide from '@modules/Users/services/UpdateUserDataServerSide';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf_cnpj, password } = request.body;
    if (!cpf_cnpj || !password) {
      throw new AppError('Os campos cpf_cnpj e senha são obrigatórios', 401);
    }

    const createSessionService = container.resolve(CreateSessionService);
    const data = await createSessionService.execute(cpf_cnpj, password);
    const updateService = container.resolve(UpdateUserDataServerSide);
    updateService.execute({ user_id: data.user.id });

    return response.status(200).json(data);
  }
}

export default SessionController;
