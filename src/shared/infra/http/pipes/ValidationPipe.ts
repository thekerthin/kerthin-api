import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as R from 'ramda';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(values: any, { metatype }: ArgumentMetadata) {
    const properties: any = Reflect.getOwnMetadata('__properties__', metatype);
    const dto = {};

    Object.entries(properties).forEach(
      ([propertyName, { valueObject, props }]: [string, any]) => {
        const propertyValue = values[propertyName];
        const valueObjectConstructorProps = Reflect.getOwnMetadata(
          '__constructor_props__',
          props,
        );

        const valueObjectProps = valueObjectConstructorProps.reduce(
          (params, propName) => {
            params[propName] = R.is(Object, propertyValue)
              ? propertyValue[propName]
              : propertyValue;
            return params;
          },
          {},
        );

        const valueObjectInstance = valueObject.create(valueObjectProps);

        // TODO: wrap exception an handle it

        dto[propertyName] = valueObjectInstance;
      },
    );

    return dto;
  }
}
