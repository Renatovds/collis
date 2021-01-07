import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/Container/providers/models/ICacheProvider';
import api from './API';
import AppError from '../../errors/AppError';

interface IPlan{
  nome: string,
  valor: string,
  velup: string,
  veldown: string,
  descricao: string
}
interface IPlansProps{
  planos:IPlan[]
}

@injectable()
class UpdateCachePlans {
  constructor(
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,

  ) {

  }

  public async execute():Promise<void> {
    console.log('Iniciando update do cache de Planos');

    const allPlans = await api.get<IPlansProps>('/plano/listAll');
    if (!allPlans) {
      throw new AppError('No data plans from api.', 500);
    }

    allPlans.data.planos.forEach((plan) => {
      this.cacheProvider.invalidate(`plans:${plan.nome}`);

      this.cacheProvider.save(`plans:${plan.nome}`, plan);
    });
    console.log('Concluido update do cache de Planos');
  }
}

export default UpdateCachePlans;
