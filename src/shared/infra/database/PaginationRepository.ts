import { PaginationOptions } from './paginationResult';

export interface PaginationRepository<T> {
  findAndCount(options: PaginationOptions): Promise<[T[], number]>;
}
