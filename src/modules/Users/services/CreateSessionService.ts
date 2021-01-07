import { sign } from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/authConfig';
import IHashProvider from '../providers/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface IResponse {
  user:User,
  token:string
}
@injectable()
class CreateSessionService {
  constructor(
@inject('HashProvider')
    private hashProvider: IHashProvider,
@inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(cpf_cnpj: string, password: string):Promise<IResponse> {
    const user = await this.userRepository.findByCPFCNPJ(cpf_cnpj);
    if (!user) {
      throw new AppError('Login/Password wrong', 401);
    }
    const match = await this.hashProvider.hashCompare(password, user.password);
    if (!match) {
      throw new AppError('Login/Password wrong', 401);
    }
    const { secret, expiresIn } = authConfig.JWT;
    const token = sign({}, secret, { subject: user.id, expiresIn });

    return { user, token };
  }
}

export default CreateSessionService;
