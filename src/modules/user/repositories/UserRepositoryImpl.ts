import { Injectable } from '@nestjs/common';
import User from '../domain/User';
import { UserRepository } from './UserRepository';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  async save(domain: User): Promise<void> {
    await this.repo.nativeInsert(domain.toRaw());
  }
}
