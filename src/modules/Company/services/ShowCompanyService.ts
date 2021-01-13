import AppError from '@shared/errors/AppError';
import ICompany from '@modules/Company/models/ICompany';
import Company from '@config/companyConfig';

class ShowCompanyService {
  private companyData:ICompany;

  constructor(

  ) {
    this.companyData = Company;
  }

  public async execute():Promise<ICompany> {
    const company = this.companyData;
    if (!company) {
      throw new AppError('Company data not found.', 501);
    }
    return company;
  }
}

export default ShowCompanyService;
