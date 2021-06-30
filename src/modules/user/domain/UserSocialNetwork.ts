import { Property, Entity, ManyToOne, PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

import { Entity as DomainEntity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { ValueObjectProp } from '../../../shared/domain/decorators/ValueObjectProp';
import { ValueObject as VO } from '../../../shared/domain/decorators/ValueObject';

import { User } from './User';
import { UserSocialNetworkName } from './value_objects/UserSocialNetworkName';
import { UserSocialNetworkLink } from './value_objects/UserSocialNetworkLink';
import { UserSocialNetworkDescription } from './value_objects/UserSocialNetworkDescription';

export abstract class Props {
  @ValueObjectProp()
  name: UserSocialNetworkName;
  @ValueObjectProp()
  link: UserSocialNetworkLink;
  @ValueObjectProp()
  description: UserSocialNetworkDescription;
}

@VO(Props)
@Entity()
export class UserSocialNetwork extends DomainEntity<Props> implements Props {
  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  @PrimaryKey()
  public readonly _id: ObjectId;

  @SerializedPrimaryKey()
  public readonly id: UniqueEntityID;

  @Property({ type: 'string' })
  name: UserSocialNetworkName;

  @Property({ type: 'string' })
  link: UserSocialNetworkLink;

  @Property({ type: 'string' })
  description: UserSocialNetworkDescription;

  @ManyToOne()
  user!: User;

  public static create(props: Props, id?: UniqueEntityID): UserSocialNetwork {
    return new UserSocialNetwork(props, id);
  }
}

export default UserSocialNetwork;
