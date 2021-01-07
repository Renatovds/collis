import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import api from '../../../shared/infra/services/API';
import BondDTO from '../DTOs/BondDTO';
import AppError from '../../../shared/errors/AppError';

@injectable()
class ShowOneUserBondService {
  constructor(

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {

  }

  public async execute(bond_number:string, id:string):Promise<BondDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }
    const { cpf_cnpj } = user;
    const bond = await api.get<BondDTO>(`/titulo/list/${bond_number}`);
    if (!bond) {
      throw new AppError('No data bond from api.', 500);
    }
    if (bond.data.cpf_cnpj !== cpf_cnpj) {
      throw new AppError('No permission for this bond.', 401);
    }
    return bond.data;
  }
}

export default ShowOneUserBondService;
