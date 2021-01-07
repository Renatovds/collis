import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/Container/providers/models/ICacheProvider';
import api from '../../../shared/infra/services/API';
import Bond from '../models/Bond';
import AppError from '../../../shared/errors/AppError';

interface IBondsProps{
  titulos:Bond[]
}
@injectable()
class UpdateUserBondCache {
  constructor(
@inject('CacheProvider')
    private cacheProvider:ICacheProvider,
  ) {

  }

  public async execute(cpfCnpj:string):Promise<void> {
    const allBonds = await api.get<IBondsProps>('/titulo/listAll');
    if (!allBonds) {
      throw new AppError('No data bonds from api.', 500);
    }

    const listBonds = allBonds.data.titulos.filter((bonds) => bonds.cpf_cnpj === cpfCnpj);
    this.cacheProvider.invalidate(`bonds:${cpfCnpj}`);

    this.cacheProvider.save(`bonds:${cpfCnpj}`, listBonds);
  }
}

export default UpdateUserBondCache;
