import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowOneUserBondService from '../../../services/ShowOneUserBondService';

class BondsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { bond } = request.params;
    console.log(bond);
    const showOneUserBond = container.resolve(ShowOneUserBondService);
    const userBond = await showOneUserBond.execute(bond, id);

    return response.status(200).json(userBond);
  }
}

export default BondsController;
