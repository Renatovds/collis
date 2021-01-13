import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/Users/services/CreateUserService';
import ShowUserService from '@modules/Users/services/ShowUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cpf_cnpj, password,
    } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(cpf_cnpj, password);

    return response.status(200).json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserBondsService = container.resolve(ShowUserService);

    const user = await showUserBondsService.execute(id);

    return response.status(200).json(user);
  }
}

export default UsersController;