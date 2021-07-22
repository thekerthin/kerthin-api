import { Class } from '../types/types';
import { plainToClass, ClassTransformOptions } from 'class-transformer';

export function mapper<T, V>(cls: Class<T>, plain: V[], options?: ClassTransformOptions): T[];

export function mapper<T, V>(cls: Class<T>, plain: V, options?: ClassTransformOptions): T;

export function mapper<T, V>(
  cls: Class<T>,
  plain: V | V[],
  options: ClassTransformOptions = {
    excludeExtraneousValues: false,
  },
): T {
  return plainToClass(cls, plain, options);
}
