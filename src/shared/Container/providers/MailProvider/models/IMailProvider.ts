import ISendEmailDTO from '../dtos/ISendEmailDTO';

interface IMailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}
export default IMailProvider;
