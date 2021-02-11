import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';

import path from 'path';

interface IRequest {
  adminEmail?: string;
  AdminName?:string;
  error:string;
  serverName?: string;
}
@injectable()
class SendErrorMailService {
  constructor(

    @inject('MailProvider')
    private mailProvider: IMailProvider,

  ) {}

  public async execute(data: IRequest): Promise<void> {
    const errorTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'ErrorServerMailToAdmin.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: data.AdminName ? data.AdminName : 'Adminstrator',
        email: data.adminEmail ? data.adminEmail : 'example@teste.com',
      },
      subject: '[Collis Telecomunicações] Erro no servidor',
      templateData: {
        file: errorTemplate,
        variables: {
          name: data.AdminName ? data.AdminName : 'Adminstrator',
          error: data.error,
          serverName: data.serverName ? data.serverName : 'no server name',
        },
      },
    });
  }
}

export default SendErrorMailService;
