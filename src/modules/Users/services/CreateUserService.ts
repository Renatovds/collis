import UpdateUserBondsService from '@modules/Bonds/services/UpdateUserBondsCache';
import { container, inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '../infra/typeorm/entities/User';
import api from '../../../shared/infra/services/API';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface IClientesPropsAPI {
  nome: string;
  login: string;
  cpf_cnpj: string;
  email: string;
}
interface IClienteUniqueProps {
  nome: string;
  login: string;
  cpf_cnpj: string;
  email: string;
  plano: string;
}
interface IClientes {
  clientes: IClientesPropsAPI[]
}
interface IClientAPIResponse {

  dados: IClienteUniqueProps[]
}

@injectable()
class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  public async execute(cpf_cnpj: string, password: string): Promise<User> {
    const existUser = await this.userRepository.findByCPFCNPJ(cpf_cnpj);

    if (existUser) {
      throw new AppError('User already exist.');
    }

    const clients = await api.get<IClientes>('/cliente/listAll');
    const { data } = clients;
    const existUserApi = data.clientes.find(
      (cliente) => cliente.cpf_cnpj === cpf_cnpj,
    );

    if (!existUserApi) {
      throw new AppError('Você ainda não é um cliente Collis.');
    }

    const response = await api.get<IClientAPIResponse>(`cliente/list/${existUserApi.login}`);

    const {
      nome, email, login, plano,
    } = response.data.dados[0];
    const hashedPassword = await this.hashProvider.hashGenerate(password);
    const user = this.userRepository.createUser({
      name: nome,
      login,
      cpf_cnpj,
      email,
      password: hashedPassword,
      plan: plano,
    });

    const updateUserBonds = container.resolve(UpdateUserBondsService);
    await this.userRepository.save(user);
    await updateUserBonds.execute(cpf_cnpj);

    return classToClass(user);
  }
}

export default CreateUserService;
