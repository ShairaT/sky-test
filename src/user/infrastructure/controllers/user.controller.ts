import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetUsersUseCase } from '../../businessCore/useCases/getUsers.usecase';

@Controller({
  path: '/test/users',
})
export class UserController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  @Get()
  async getUsers(@Res() res: Response): Promise<Response> {
    const users = await this.getUsersUseCase.execute();
    return res.status(HttpStatus.OK).json(users);
  }
}
