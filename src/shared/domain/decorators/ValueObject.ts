export const METADATA_KEY = '__props_class__';

// TODO: add correct typing
export function ValueObject(propsClass: any) {
  return function (prototype: Function) {
    Reflect.defineMetadata(METADATA_KEY, propsClass, prototype);
  };
}
