import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/Users/services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

class ForgotPasswordEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    console.log(email);

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );
    await sendForgotPasswordEmailService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotPasswordEmailController;
