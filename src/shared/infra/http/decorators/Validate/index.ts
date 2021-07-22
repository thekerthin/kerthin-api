import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';

import { Entity } from '../../../../domain/Entity';
import { ValueObject, ValueObjectProps } from '../../../../domain/ValueObject';
import { METADATA_KEY as MKVO } from '../../../../domain/decorators/ValueObject';
import { METADATA_KEY as MKVOP } from '../../../../domain/decorators/ValueObjectProp';

import { getOpenAPIPropTypes } from './utils';

export const PROPERTY_VALUE_OBJECT = '__PROPERTY_VALUE_OBJECT__';
export const PROPERTY_VALIDATION_METADATA = '__PROPERTY_VALIDATION_METADATA__';

type ValueObjectClass = {
  create(props: ValueObjectProps): ValueObject<any> | Entity<any>;
};

export function Validate(valueObject: ValueObjectClass, openApiOptions: ApiPropertyOptions = {}) {
  return function (target: any, propertyName: string) {
    const prototype = target.constructor;
    const properties = Reflect.getOwnMetadata(PROPERTY_VALUE_OBJECT, prototype) || {};
    const metadata = Reflect.getOwnMetadata(PROPERTY_VALIDATION_METADATA, prototype) || {};

    const valueObjectOrEntityPropsClass = Reflect.getMetadata(MKVO, valueObject);
    const valueObjectOrEntityProps = Reflect.getMetadata(MKVOP, valueObjectOrEntityPropsClass);

    if (!properties.hasOwnProperty(propertyName)) {
      properties[propertyName] = valueObject;
    }
    if (!metadata.hasOwnProperty(propertyName)) {
      metadata[propertyName] = openApiOptions;
    }

    Reflect.defineMetadata(PROPERTY_VALUE_OBJECT, properties, prototype);
    Reflect.defineMetadata(PROPERTY_VALIDATION_METADATA, metadata, prototype);

    let openAPIPropTypes = getOpenAPIPropTypes(valueObjectOrEntityProps);

    if (openApiOptions.isArray) {
      openAPIPropTypes = {
        type: 'array',
        items: openAPIPropTypes,
      };
    }

    ApiPropertyOptional(openAPIPropTypes)(target, propertyName);
  };
}
