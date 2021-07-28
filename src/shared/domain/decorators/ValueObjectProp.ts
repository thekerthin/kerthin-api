import { Transform, Type } from 'class-transformer';

const primitives = [String, Number, Boolean, Date];

type Options = {
  type?: any;
};

export function ValueObjectProp(options: Options = {}) {
  return function (target: any, propertyKey: string) {
    const typing = Reflect.getMetadata('design:type', target, propertyKey);
    const isPrimitive = primitives.includes(typing);

    if (isPrimitive) return;

    if (options.type) {
      Type(() => options.type)(target, propertyKey);
      return;
    }

    Transform(({ value }) => typing.create({ value }))(target, propertyKey);
  };
}
