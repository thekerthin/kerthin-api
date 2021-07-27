import { PrimaryKey } from '@mikro-orm/core';

import { UniqueEntityID } from './UniqueEntityID';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  @PrimaryKey({ type: 'uuid' })
  public readonly id: UniqueEntityID;

  protected readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this.id = id ? id : new UniqueEntityID();
    this.props = props;
    Entity.setProps(this, props);
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }

  public toRaw<T = any>(): T {
    const defaults = { id: this.id.toString() };

    return this.serialize(this.props, defaults);
  }

  // TODO: change validate sign/API, return all the errors presented
  public validate(): void {
    Object.keys(this.props).forEach((propKey) => {
      const prop = this.props[propKey];
      Array.isArray(prop) ? prop.forEach((p) => p.validate()) : prop.validate();
    });
  }

  private serialize(props: any, defaults: any = {}) {
    return Object.entries(props).reduce((raw: any, [propName, valueObject]: any) => {
      raw[propName] = Array.isArray(valueObject)
        ? valueObject.map((vo) => this.serialize(vo.props))
        : valueObject.toValue();

      return raw;
    }, defaults);
  }

  private static setProps<T>(entity: Entity<T>, props: T) {
    Object.keys(props).forEach((propKey) => {
      entity[propKey] = props[propKey];
    });
  }
}
