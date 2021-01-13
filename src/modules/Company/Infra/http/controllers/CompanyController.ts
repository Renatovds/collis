import { Request, Response } from 'express';
import ShowCompanyService from '@modules/Company/services/ShowCompanyService';

class CompanyController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showCompany = new ShowCompanyService();
    const company = await showCompany.execute();

    return response.status(200).json(company);
  }
}

export default CompanyController;
