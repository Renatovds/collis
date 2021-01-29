import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

@injectable()
class ShowUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository:IUserRepository,
  ) {

  }

  public async execute(cpfCnpj:string):Promise<User> {
    const user = await this.usersRepository.findByCPFCNPJ(cpfCnpj);
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    return classToClass(user);
  }
}

export default ShowUserService;
