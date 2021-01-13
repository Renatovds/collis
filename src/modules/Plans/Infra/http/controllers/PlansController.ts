import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowPlanService from '../../../services/ShowPlanService';

class PlansController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { planName } = request.query;
    if (!planName) {
      throw new AppError('Plan name not send ');
    }
    const showPlan = container.resolve(ShowPlanService);
    const plan = await showPlan.execute(planName.toString());

    return response.status(200).json(plan);
  }
}

export default PlansController;
