import { getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/Users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });
    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } });

    return userToken;
  }
}

export default UsersTokensRepository;
