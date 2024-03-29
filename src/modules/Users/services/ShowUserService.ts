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

  public async execute(id:string):Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    return classToClass(user);
  }
}

export default ShowUserService;
