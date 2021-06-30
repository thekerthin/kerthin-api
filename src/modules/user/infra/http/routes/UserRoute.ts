import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserUseCase } from '../../../use_cases/create_user/CreateUserUseCase';
import { CreateUserDTO } from '../../../use_cases/create_user/CreateUserDTO';

@ApiTags('User')
@Controller('users')
export class UserRoute {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.createUserUseCase.execute(data);
  }
}
