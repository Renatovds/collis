import User from '@modules/Users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import api from '../../../shared/infra/services/API';

interface IRequest {
  user_id: string;
}
interface IClienteUniqueProps {
  nome: string;
  login: string;
  cpf_cnpj: string;
  plano: string;
}

interface IClientAPIResponse {

  dados: IClienteUniqueProps[]
}
@injectable()
class UpdateUserDataServerSide {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

  ) {}

  public async execute({
    user_id,

  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const response = await api.get<IClientAPIResponse>(`cliente/list/${user.login}`);
    if (!response) {
      throw new AppError('User not found on API MKAuth.');
    }
    const {
      nome, login, plano, cpf_cnpj,
    } = response.data.dados[0];
    user.name = nome;
    user.login = login;
    user.cpf_cnpj = cpf_cnpj;
    user.plan = plano;
    await this.usersRepository.save(user);
    return classToClass(user);
  }
}

export default UpdateUserDataServerSide;
