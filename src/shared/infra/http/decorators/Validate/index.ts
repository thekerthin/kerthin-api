import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';

import { Entity } from '../../../../domain/Entity';
import { ValueObject, ValueObjectProps } from '../../../../domain/ValueObject';
import { METADATA_KEY as MKVO } from '../../../../domain/decorators/ValueObject';
import { METADATA_KEY as MKVOP } from '../../../../domain/decorators/ValueObjectProp';

import { getOpenAPIPropTypes } from './utils';

export const METADATA_KEY = '__props__';

type ValueObjectClass = {
  create(props: ValueObjectProps): ValueObject<any> | Entity<any>;
};

export function Validate(valueObject: ValueObjectClass, openApiOptions: ApiPropertyOptions = {}) {
  return function (target: any, propertyKey: string) {
    const prototype = target.constructor;
    const properties = Reflect.getOwnMetadata(METADATA_KEY, prototype) || {};

    const propsClass = Reflect.getMetadata(MKVO, valueObject);
    const props = Reflect.getMetadata(MKVOP, propsClass);

    if (!properties.hasOwnProperty(propertyKey)) {
      properties[propertyKey] = valueObject;
    }

    Reflect.defineMetadata(METADATA_KEY, properties, prototype);

    let openAPIPropTypes = getOpenAPIPropTypes(props);

    if (openApiOptions.isArray) {
      openAPIPropTypes = {
        type: 'array',
        items: openAPIPropTypes,
      };
    }

    ApiPropertyOptional(openAPIPropTypes)(target, propertyKey);
  };
}
