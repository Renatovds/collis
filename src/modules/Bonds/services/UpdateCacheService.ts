import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/Container/providers/models/ICacheProvider';

import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import ServerError from '@shared/errors/ServerError';
import api from '../../../shared/infra/services/API';

import Bond from '../models/Bond';
import AppError from '../../../shared/errors/AppError';

interface IBondsProps{
  titulos:Bond[]
}

@injectable()
class UpdateCacheService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {

  }

  public async execute():Promise<void> {
    console.log(`Iniciando update do cache de Titulos - ${new Date().toISOString()}`);
    const users = await this.userRepository.findAllUsers();

    if (!users) {
      throw new AppError('No users on database.', 500);
    }

    const cpfCnpjUsers = users.map((user) => user.cpf_cnpj);

    console.log(cpfCnpjUsers);

    const allBonds = await api.get<IBondsProps>('/titulo/listAll')
      .catch((err) => {
        throw new ServerError(
          `Erro ao efetuar update do cache de Titulos  - ${err}`,
        ).sendMail();
      });
    if (!allBonds) {
      throw new AppError('No data bonds from api.', 500);
    }

    cpfCnpjUsers.forEach((cpfCnpj) => {
      const listBonds = allBonds.data.titulos.filter(
        (bonds) => bonds.cpf_cnpj === cpfCnpj,
      );
      this.cacheProvider.invalidate(`bonds:${cpfCnpj}`);

      this.cacheProvider.save(`bonds:${cpfCnpj}`, listBonds);
    });
    console.log(`Concluido update do cache de Titulos - ${new Date().toISOString()}`);
  }
}

export default UpdateCacheService;
