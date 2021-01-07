import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowUserBonds from '../../../services/ShowUserBondsService';

class ShowDetalhedBondController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserBonds = container.resolve(ShowUserBonds);
    const bonds = await showUserBonds.execute(id);

    return response.status(200).json(bonds);
  }
}

export default ShowDetalhedBondController;
