import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';

import { UserCreatedEvent } from './events/UserCreatedEvent';

import { UserId } from './value_objects/UserId';
import { UserName } from './value_objects/UserName';
import { UserLastName } from './value_objects/UserLastName';
import { UserBornDate } from './value_objects/UserBornDate';
import { UserTitle } from './value_objects/UserTitle';
import { UserDescription } from './value_objects/UserDescription';
import { UserUserName } from './value_objects/UserUserName';
import { UserEmail } from './value_objects/UserEmail';
import { UserPhone } from './value_objects/UserPhone';
import { UserSocialNetwork } from './UserSocialNetwork';
import { UserEducation } from './UserEducation';
import { UserWorkExperience } from './UserWorkExperience';
import { UserSkill } from './UserSkill';

export abstract class Props {
  userId: UserId;
  name: UserName;
  lastName: UserLastName;
  bornDate: UserBornDate;
  title: UserTitle;
  description: UserDescription;
  username: UserUserName;
  email: UserEmail;
  phone: UserPhone;
  socialNetworks: UserSocialNetwork[] | Collection<UserSocialNetwork>;
  education: UserEducation[] | Collection<UserEducation>;
  workExperience: UserWorkExperience[];
  skills: UserSkill[];
}

@Entity()
export class User extends AggregateRoot<Props> implements Props {
  @PrimaryKey()
  public readonly _id: ObjectId;

  @SerializedPrimaryKey()
  public readonly id: UniqueEntityID;

  get userId(): UserId {
    return UserId.create(this.id);
  }

  @Property({ type: 'string' })
  name: UserName;

  @Property({ type: 'string', name: 'last_name' })
  lastName: UserLastName;

  @Property({ type: 'date', name: 'born_date' })
  bornDate: UserBornDate;

  @Property({ type: 'string' })
  title: UserTitle;

  @Property({ type: 'string' })
  description: UserDescription;

  @Property({ type: 'string' })
  username: UserUserName;

  @Property({ type: 'string' })
  email: UserEmail;

  @Property({ type: 'string' })
  phone: UserPhone;

  @OneToMany(() => UserSocialNetwork, (sn) => sn.user)
  socialNetworks = new Collection<UserSocialNetwork>(this);

  @OneToMany(() => UserEducation, (education) => education.user)
  education = new Collection<UserEducation>(this);

  @OneToMany(() => UserWorkExperience, (we) => we.user)
  workExperience: UserWorkExperience[];

  @OneToMany(() => UserSkill, (skill) => skill.user)
  skills: UserSkill[];

  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: Props, id?: UniqueEntityID): User {
    const isNew = !!id === false;

    const user = new User({ ...props }, id);

    if (isNew) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}

export default User;
