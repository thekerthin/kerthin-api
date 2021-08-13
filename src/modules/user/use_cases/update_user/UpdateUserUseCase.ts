import { Injectable } from '@nestjs/common';
import { isEmptyOrNil } from '@kerthin/utils';
import { mergeDeepRight } from 'ramda';

import { UseCase } from '../../../../shared/core/UseCase';
import { UserDTO } from '../../dtos/UserDto';
import { UpdateUserDTO } from './UpdateUserDTO';
import { User, Props } from '../../domain/User';
// TODO: update miscellaneous
import { mapper } from '../../../../shared/utils/mapper';
import { UserRepository } from '../../repositories/UserRepository';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

@Injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserDTO, Promise<UserDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UpdateUserDTO): Promise<UserDTO> {
    const currentUser = await this.userRepository.findById(data.id);

    if (isEmptyOrNil(currentUser)) {
      throw new Error('The user does not exist');
    }

    const userUpdated = mergeDeepRight(currentUser, data);
    const userProps = mapper(Props, userUpdated);
    const uniqueId = new UniqueEntityID(userUpdated.id);
    const user = User.create(userProps, uniqueId);

    await this.userRepository.update(user);

    return user.toRaw();
  }
}
