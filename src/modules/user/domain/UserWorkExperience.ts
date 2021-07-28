import { Property, Entity, ManyToOne, PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

import { User } from './User';

import { Entity as DomainEntity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { ValueObjectProp } from '../../../shared/domain/decorators/ValueObjectProp';

export abstract class Props {
  @ValueObjectProp() jobTitle: string;
  @ValueObjectProp() jobType: string;
  @ValueObjectProp() company: string;
  @ValueObjectProp() location: string;
  @ValueObjectProp() startDate: Date;
  @ValueObjectProp() endDate: Date;
  @ValueObjectProp() isCurrentJob: boolean;
  @ValueObjectProp() description: string;
}

@Entity()
export class UserWorkExperience extends DomainEntity<Props> implements Props {
  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  @PrimaryKey()
  public readonly _id: ObjectId;

  // @SerializedPrimaryKey()
  public readonly id: UniqueEntityID;

  @Property({ type: 'string' })
  jobTitle: string;

  @Property({ type: 'string' })
  jobType: string;

  @Property({ type: 'string' })
  company: string;

  @Property({ type: 'string' })
  location: string;

  @Property({ type: 'string' })
  startDate: Date;

  @Property({ type: 'string' })
  endDate: Date;

  @Property({ type: 'string' })
  isCurrentJob: boolean;

  @Property({ type: 'string' })
  description: string;

  @ManyToOne()
  user!: User;

  public static create(props: Props, id?: UniqueEntityID): UserWorkExperience {
    return new UserWorkExperience(props, id);
  }
}

export default UserWorkExperience;
