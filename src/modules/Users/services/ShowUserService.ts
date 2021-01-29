import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import api from '@shared/infra/services/API/index';
import User from '../infra/typeorm/entities/User';

@injectable()
class ShowUserService {
  constructor(
    @inject('UserRepository')
    private usersReposytory:IUserRepository,
  ) {

  }

  public async execute(id:string):Promise<User> {
    const user = await this.usersReposytory.findById(id);
    if (!user) {
      throw new AppError('User not found.', 400);
    }
    return classToClass(user);
  }
}

export default ShowUserService;
