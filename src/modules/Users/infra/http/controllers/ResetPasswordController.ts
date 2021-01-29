import { Request, Response } from 'express';
import ResetPasswordService from '@modules/Users/services/ResetPasswordService';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, password_confirmation } = request.body;
    const { token } = request.query;
    if (!token) {
      throw new AppError('token not provided');
    }
    const parsedToken = token.toString();
    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({
      password,
      password_confirmation,
      token: parsedToken,
    });
    return response.status(204).json();
  }
}

export default ResetPasswordController;
