export interface UseCase<T, R> {
  execute(data?: T): R;
}
