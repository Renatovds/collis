import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/Container/providers/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import Bond from '../models/Bond';

@injectable()
class ShowBondUserService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {

  }

  public async execute(id:string):Promise<Bond[] | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }
    const { cpf_cnpj } = user;
    const userBonds = await this.cacheProvider.recover<Bond[]>(`bonds:${cpf_cnpj}`);

    return userBonds;
  }
}

export default ShowBondUserService;
