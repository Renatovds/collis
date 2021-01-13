import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/Container/providers/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Plan from '../models/IPlan';

@injectable()
class ShowPlanService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
  ) {

  }

  public async execute(key:string):Promise<Plan> {
    const plan = await this.cacheProvider.recover<Plan>(`plans:${key}`);
    if (!plan) {
      throw new AppError('Plan not found.', 400);
    }
    return plan;
  }
}

export default ShowPlanService;
