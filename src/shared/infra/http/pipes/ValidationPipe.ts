import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import {
  PROPERTY_VALUE_OBJECT as PVO,
  PROPERTY_VALIDATION_METADATA as PVM,
} from '../decorators/Validate';
import { METADATA_KEY as MKVO } from '../../../domain/decorators/ValueObject';
import { METADATA_KEY as MKVOP } from '../../../domain/decorators/ValueObjectProp';
import { ValueObject } from '../../../domain/ValueObject';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(values: any, { metatype }: ArgumentMetadata) {
    const properties: any = Reflect.getOwnMetadata(PVO, metatype);
    const metadata: any = Reflect.getOwnMetadata(PVM, metatype);

    return Object.entries(properties).reduce(this.buildDTO(values, metadata), {});
  }

  private buildDTO =
    (values: any, validationMetadata = {}) =>
    (dto, property) => {
      const [propertyName, valueObjectOrEntity] = property;
      const propertyValue = values?.[propertyName];
      const metadata = validationMetadata?.[propertyName];

      dto[propertyName] = this.buildDTOPropertyValueObjectOrEntity(
        valueObjectOrEntity,
        propertyValue,
      );

      return dto;
    };

  private buildDTOPropertyValueObjectOrEntity(valueObjectOrEntity: any, value: any) {
    const valueObjectOrEntityPropsClass = Reflect.getMetadata(MKVO, valueObjectOrEntity);
    const valueObjectOrEntityProps = Reflect.getMetadata(MKVOP, valueObjectOrEntityPropsClass);

    const isValueObject = valueObjectOrEntity.__proto__.name === ValueObject.name;

    if (isValueObject) {
      const keys = Object.keys(valueObjectOrEntityProps);
      const params = keys.length > 1 ? value : { [keys[0]]: value };
      return valueObjectOrEntity.create(params);
    }

    return Object.entries(valueObjectOrEntityProps).reduce(this.buildDTO(value), {});
  }
}
