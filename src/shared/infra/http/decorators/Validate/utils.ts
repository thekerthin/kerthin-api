import { ifElse, toLower } from 'ramda';
import { ValueObject } from '../../../../domain/ValueObject';

import { METADATA_KEY as MKVO } from '../../../../domain/decorators/ValueObject';
import { METADATA_KEY as MKVOP } from '../../../../domain/decorators/ValueObjectProp';

export const hasManyProp = (props: any): boolean => Object.keys(props).length > 1;

export const getOpenAPIPropTypes = ifElse(hasManyProp, getTypes, getType);

function getType(props: any): any {
  const [key] = Object.keys(props);
  return { type: toLower(props[key].name) };
}

function getTypes(props: any): any {
  const properties = Object.keys(props).reduce((types, key) => {
    const propType = props[key];
    const isValueObject = propType.__proto__.name === ValueObject.name;

    if (isValueObject) {
      const propTypeClass = Reflect.getMetadata(MKVO, propType);
      const propTypeProps = Reflect.getMetadata(MKVOP, propTypeClass);
      types[key] = getOpenAPIPropTypes(propTypeProps);
    } else {
      types[key] = { type: toLower(props[key].name) };
    }

    return types;
  }, {});

  return {
    type: 'object',
    properties,
  };
}
