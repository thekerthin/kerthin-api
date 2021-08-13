import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDTO } from '../../../use_cases/create_user/CreateUserDTO';
import { CreateUserUseCase } from '../../../use_cases/create_user/CreateUserUseCase';
import { FindUsersUseCase } from '../../../use_cases/find_users/FindUsersUseCase';
import { PaginationOptions } from '../../../../../shared/infra/database/paginationResult';
import { UpdateUserUseCase } from '../../../use_cases/update_user/UpdateUserUseCase';
import { UpdateUserDTO } from '../../../use_cases/update_user/UpdateUserDTO';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
  ) {}

  @Query('user')
  findUser(@Args('id') id: string) {
    console.log('id', id);

    return null;
  }

  @Query('users')
  findUsers(@Args('pagination') pagination: PaginationOptions) {
    return this.findUsersUseCase.execute(pagination);
  }

  @Mutation()
  createUser(@Args('input') input: CreateUserDTO) {
    return this.createUserUseCase.execute(input);
  }

  @Mutation()
  updateUser(@Args('id') id: string, @Args('input') input: UpdateUserDTO) {
    return this.updateUserUseCase.execute({ ...input, id });
  }
}
