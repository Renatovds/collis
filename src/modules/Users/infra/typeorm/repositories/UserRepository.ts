import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';
import IUserProps from '../../../DTOs/IUserPropsDTO';
import IUserRepository from '../../../repositories/IUsersRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByCPFCNPJ(cpf_cnpj:string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { cpf_cnpj } });

    return user;
  }

  public async findAllUsers():Promise<User[] | undefined> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async findById(id:string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ id });

    return user;
  }

  public async findByEmail(email:string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public createUser(data:IUserProps):User {
    const {
      name, email, cpf_cnpj, login, password, plan,
    } = data;
    const user = this.ormRepository.create({
      name, email, cpf_cnpj, login, password, plan,

    });

    return user;
  }

  public async save(user:User):Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
