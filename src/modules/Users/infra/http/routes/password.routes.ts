import { Router } from 'express';
import ForgotPasswordEmailController from '../controllers/ForgotPasswordEmailController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordEmailController = new ForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  forgotPasswordEmailController.create,
);
passwordRouter.post(
  '/reset',
  resetPasswordController.create,
);

export default passwordRouter;
