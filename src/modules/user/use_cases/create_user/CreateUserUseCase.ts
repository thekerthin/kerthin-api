import { Injectable } from '@nestjs/common';

import { UseCase } from '../../../../shared/core/UseCase';
import { UserDTO } from '../../dtos/UserDto';
import { CreateUserDTO } from './CreateUserDTO';
import { User, Props } from '../../domain/User';
import { mapper } from '../../../../shared/utils/mapper';
import { UserRepository } from '../../repositories/UserRepository';

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<UserDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<UserDTO> {
    const userProps = mapper(Props, data);
    const user = User.create(userProps);

    user.validate();

    await this.userRepository.save(user);

    return Promise.resolve(data as UserDTO);
  }
}
