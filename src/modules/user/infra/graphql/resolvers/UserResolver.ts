import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDTO } from '../../../use_cases/create_user/CreateUserDTO';
import { CreateUserUseCase } from '../../../use_cases/create_user/CreateUserUseCase';

@Resolver('User')
export class UserResolver {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Query()
  async findUser(@Args('id') id: string) {
    console.log('id', id);

    return null;
  }

  @Query()
  async findUsers() {
    return [];
  }

  @Mutation()
  async createUser(@Args('input') input: CreateUserDTO) {
    return this.createUserUseCase.execute(input);
  }
}
