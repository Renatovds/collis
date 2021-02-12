import { container } from 'tsyringe';
import SendErrorMail from '@modules/Users/services/SendErrorMailService';

class ServerError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }

  public async sendMail():Promise<void> {
    console.log(this.message);
    console.log('enviar email');
    const sendErrorMail = container.resolve(SendErrorMail);
    sendErrorMail.execute({
      AdminName: process.env.ADMIN_SERVER_NAME,
      adminEmail: process.env.ADMIN_SERVER_EMAIL,
      serverName: process.env.SERVER_NAME,
      error: this.message,
    });
  }
}
export default ServerError;
