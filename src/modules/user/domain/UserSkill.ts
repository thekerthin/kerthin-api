import { Property, Entity, ManyToOne, PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

import { Entity as DomainEntity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { ValueObjectProp } from '../../../shared/domain/decorators/ValueObjectProp';
import { ValueObject as VO } from '../../../shared/domain/decorators/ValueObject';

import { User } from './User';
import { UserSkillName } from './value_objects/UserSkillName';
import { UserSkillScore } from './value_objects/UserSkillScore';

export abstract class Props {
  @ValueObjectProp()
  name: UserSkillName;
  @ValueObjectProp()
  score: UserSkillScore;
}

@VO(Props)
@Entity()
export class UserSkill extends DomainEntity<Props> implements Props {
  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  @PrimaryKey()
  public readonly _id: ObjectId;

  @SerializedPrimaryKey()
  public readonly id: UniqueEntityID;

  @Property({ type: 'string' })
  name: UserSkillName;

  @Property({ type: 'number' })
  score: UserSkillScore;

  @ManyToOne()
  user!: User;

  public static create(props: Props, id?: UniqueEntityID): UserSkill {
    return new UserSkill(props, id);
  }
}

export default UserSkill;
