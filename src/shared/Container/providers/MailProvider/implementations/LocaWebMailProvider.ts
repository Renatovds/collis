import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private templateProvider: IMailTemplateProvider,
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.LOCAWEB_HOST_SMTP,
      port: process.env.LOCAWEB_PORT,
      secure: false,

      auth: {
        user: process.env.LOCAWEB_ACCESS_KEY_ID,
        pass: process.env.LOCAWEB_SECRET_ACCESS_KEY,
      },

    });
    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Collis',
        address: from?.email || 'contato@collisinternet.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,

      html: await this.templateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
export default EtherealMailProvider;
