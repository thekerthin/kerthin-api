export function ValueObjectProp() {
  return function (target: any, propertyKey: string) {
    const prototype = target.constructor;
    const properties =
      Reflect.getOwnMetadata('__constructor_props__', prototype) || [];

    if (!properties.includes(propertyKey)) {
      properties.push(propertyKey);
    }

    Reflect.defineMetadata('__constructor_props__', properties, prototype);
  };
}
