export const METADATA_KEY = '__internal_props__';

export function ValueObjectProp() {
  return function (target: any, propertyKey: string) {
    const prototype = target.constructor;
    const properties = Reflect.getOwnMetadata(METADATA_KEY, prototype) || {};

    if (!properties.hasOwnProperty(propertyKey)) {
      properties[propertyKey] = Reflect.getMetadata('design:type', target, propertyKey);
    }

    Reflect.defineMetadata(METADATA_KEY, properties, prototype);
  };
}
