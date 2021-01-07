import { container } from 'tsyringe';
import IHashProvider from './models/IHashProvider';
import BcryptHashProvider from './implementations/BcryptHashProvider';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokensRepository);
