import { EntityRepository } from '@mikro-orm/core';
import { Repository } from '../../../shared/infra/database/Repository';
import { User } from '../domain/User';

export abstract class UserRepository extends Repository<User> {
  protected repo: EntityRepository<User> = this.orm.em.getRepository(User);

  abstract insert(data: User): Promise<void>;
}
