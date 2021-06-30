import { Injectable } from '@nestjs/common';

import { UseCase } from '../../../../shared/core/UseCase';
import { UserDTO } from '../../dtos/UserDto';

import { CreateUserDTO } from './CreateUserDTO';

type UseCaseResult = UserDTO | void;

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, UseCaseResult> {
  execute(data: CreateUserDTO): UseCaseResult {
    // console.log('data', data);
  }
}
