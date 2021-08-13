import { EntityRepository } from '@mikro-orm/core';
import { Repository } from '../../../shared/infra/database/Repository';
import { PaginationRepository } from '../../../shared/infra/database/PaginationRepository';
import { User } from '../domain/User';
import { PaginationOptions } from 'shared/infra/database/paginationResult';

export abstract class UserRepository
  extends Repository<User>
  implements PaginationRepository<User>
{
  protected repo: EntityRepository<User> = this.orm.em.getRepository(User);

  abstract insert(data: User): Promise<void>;

  abstract update(data: User): Promise<void>;

  abstract findById(id: string): Promise<User>;

  abstract findAndCount(options: PaginationOptions): Promise<[User[], number]>;
}
