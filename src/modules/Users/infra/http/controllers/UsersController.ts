import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/Users/services/CreateUserService';
import SearchByCPFCNPJService from '@modules/Users/services/SearchByCPFCNPJService';
import UpdateUserProfileService from '@modules/Users/services/UpdateUserProfileService';
import AppError from '@shared/errors/AppError';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cpf_cnpj, password,
    } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(cpf_cnpj, password);

    return response.status(200).json(user);
  }

  public async showEmail(request: Request, response: Response): Promise<Response> {
    const { cpfCnpj } = request.query;

    if (!cpfCnpj) {
      throw new AppError('CPF/CNPJ was not provided');
    }

    const searchByCPFCNPJ = container.resolve(SearchByCPFCNPJService);

    const user = await searchByCPFCNPJ.execute(cpfCnpj.toString());
    const { email } = user;
    return response.status(200).json(email);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      name, email, old_password, password,
    } = request.body;

    const updateUser = container.resolve(UpdateUserProfileService);

    const user = await updateUser.execute({
      user_id: id, email, name, password, old_password,
    });

    return response.status(200).json(user);
  }
}

export default UsersController;
