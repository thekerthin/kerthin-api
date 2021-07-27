import { Property, Entity, ManyToOne, PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Transform } from 'class-transformer';

import { Entity as DomainEntity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

import { User } from './User';
import { UserSocialNetworkName } from './value_objects/UserSocialNetworkName';
import { UserSocialNetworkLink } from './value_objects/UserSocialNetworkLink';
import { UserSocialNetworkDescription } from './value_objects/UserSocialNetworkDescription';
import { transformValueObject } from '../../../shared/domain/transformValueObject';

export class Props {
  @Transform(transformValueObject(UserSocialNetworkName))
  name: UserSocialNetworkName;

  @Transform(transformValueObject(UserSocialNetworkLink))
  link: UserSocialNetworkLink;

  @Transform(transformValueObject(UserSocialNetworkDescription))
  description: UserSocialNetworkDescription;
}

@Entity()
export class UserSocialNetwork extends DomainEntity<Props> implements Props {
  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  @PrimaryKey()
  public readonly _id: ObjectId;

  // @SerializedPrimaryKey()
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
