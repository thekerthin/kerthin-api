import { Property, Entity, ManyToOne, PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

import { Entity as DomainEntity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { ValueObjectProp } from '../../../shared/domain/decorators/ValueObjectProp';
import { ValueObject as VO } from '../../../shared/domain/decorators/ValueObject';

import { User } from './User';
import { UserEducationInstitute } from './value_objects/UserEducationInstitute';
import { UserEducationTitle } from './value_objects/UserEducationTitle';
import { UserEducationDescription } from './value_objects/UserEducationDescription';

export abstract class Props {
  @ValueObjectProp()
  institute: UserEducationInstitute;
  @ValueObjectProp()
  title: UserEducationTitle;
  @ValueObjectProp()
  startDate: Date;
  @ValueObjectProp()
  endDate: Date;
  @ValueObjectProp()
  isCurrentStudy: boolean;
  @ValueObjectProp()
  description: UserEducationDescription;
}

@VO(Props)
@Entity()
export class UserEducation extends DomainEntity<Props> implements Props {
  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }
  @PrimaryKey()
  public readonly _id: ObjectId;

  @SerializedPrimaryKey()
  public readonly id: UniqueEntityID;

  @Property({ type: 'string' })
  institute: UserEducationInstitute;

  @Property({ type: 'string' })
  title: UserEducationTitle;

  @Property({ type: 'Date', name: 'start_date' })
  startDate: Date;

  @Property({ type: 'string', name: 'end_date' })
  endDate: Date;

  @Property({ type: 'boolean', name: 'is_current_study' })
  isCurrentStudy: boolean;

  @Property({ type: 'string' })
  description: UserEducationDescription;

  @ManyToOne()
  user!: User;

  public static create(props: Props, id?: UniqueEntityID): UserEducation {
    return new UserEducation(props, id);
  }
}

export default UserEducation;
