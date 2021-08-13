import { Injectable } from '@nestjs/common';

import { UseCase } from '../../../../shared/core/UseCase';
import { UserRepository } from '../../repositories/UserRepository';
import { FindUsersDTO } from './FindUsersDTO';
// import { UserDTO } from '../../dtos/UserDTO';
import { pagination, PaginationOptions } from '../../../../shared/infra/database/paginationResult';

@Injectable()
export class FindUsersUseCase implements UseCase<PaginationOptions, Promise<FindUsersDTO>> {
  constructor(private readonly repository: UserRepository) {}

  async execute(options: PaginationOptions): Promise<FindUsersDTO> {
    // TODO: fix typing
    return pagination<any>(this.repository, options);
  }
}
