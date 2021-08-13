import { Injectable } from '@nestjs/common';
import { ObjectId } from '@mikro-orm/mongodb';
import { PaginationOptions } from 'shared/infra/database/paginationResult';
import User from '../domain/User';
import { UserRepository } from './UserRepository';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  async insert(domain: User): Promise<void> {
    await this.repo.nativeInsert(domain.toRaw());
  }

  async update(domain: User): Promise<void> {
    await this.repo.nativeInsert(domain.toRaw());
  }

  findById(id: string): Promise<User> {
    return this.repo.findOne({ _id: new ObjectId(id) });
  }

  findAndCount(options: PaginationOptions): Promise<[User[], number]> {
    console.log(options.getOffset());

    return this.repo.findAndCount(
      {},
      {
        limit: options.limit || options.first,
        ...options.getOffset(),
      },
    );
  }
}
