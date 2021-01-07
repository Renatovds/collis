import User from '@modules/Users/infra/typeorm/entities/User';
import IUserProps from '@modules/Users/DTOs/IUserPropsDTO';

 interface IUserRepository{
  findByCPFCNPJ(cpf_cnpj:string):Promise<User | undefined>
  findAllUsers():Promise<User[] | undefined>
  createUser(data:IUserProps):User
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default IUserRepository;
