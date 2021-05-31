import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Repository<T> {
  protected abstract repo: EntityRepository<T>;

  constructor(protected readonly orm: MikroORM) {}
}
