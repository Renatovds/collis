import { Response, Request } from 'express';
// import { container } from 'tsyringe';
// import CreateUserService from '@modules/users/services/CreateUserService';
// import { classToClass } from 'class-transformer';

class TestController {
  public async create(request: Request, response: Response): Promise<Response> {
    // const { name, email, password } = request.body;

    const user = 'test';
    return response.json(user);
  }
}

export default TestController;
