import { ValueObject, ValueObjectProps } from 'shared/domain/ValueObject';

type ValueObjectClass = {
  create(props: ValueObjectProps): ValueObject<any>;
};

export function Validate(
  valueObject: ValueObjectClass,
  props: ValueObjectProps,
) {
  return function (target: any, propertyKey: string) {
    const prototype = target.constructor;
    const properties =
      Reflect.getOwnMetadata('__properties__', prototype) || {};

    if (!properties[propertyKey]) {
      properties[propertyKey] = {
        valueObject,
        props,
      };
    }

    Reflect.defineMetadata('__properties__', properties, prototype);
  };
}
