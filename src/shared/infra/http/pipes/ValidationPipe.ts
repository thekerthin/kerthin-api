import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as R from 'ramda';

import { METADATA_KEY as MKV } from '../decorators/Validate';
import { METADATA_KEY as MKVO } from '../../../domain/decorators/ValueObject';
import { METADATA_KEY as MKVOP } from '../../../domain/decorators/ValueObjectProp';
import { ValueObject } from '../../../domain/ValueObject';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(values: any, { metatype }: ArgumentMetadata) {
    const properties: any = Reflect.getOwnMetadata(MKV, metatype);

    const dto = {};

    Object.entries(properties).forEach(([propertyName, valueObject]: [string, any]) => {
      const propertyValue = values[propertyName];
      const propsClass = Reflect.getMetadata(MKVO, valueObject);
      const valueObjectConstructorProps = Reflect.getMetadata(MKVOP, propsClass);

      const valueObjectProps = Object.entries(valueObjectConstructorProps).reduce(
        (params, [propName, type]) => {
          if ((type as any).__proto__.name === ValueObject.name) {
            const propsClass = Reflect.getMetadata(MKVO, type);
            const propsFooBar = Reflect.getMetadata(MKVOP, propsClass);
          }

          params[propName] = R.is(Object, propertyValue) ? propertyValue[propName] : propertyValue;
          return params;
        },
        {},
      );

      // TODO: wrap exception an handle it
      dto[propertyName] = valueObject.create(valueObjectProps);
    });

    return dto;
  }
}
