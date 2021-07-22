import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Transform } from 'class-transformer';

import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { transformValueObject } from '../../../shared/domain/transformValueObject';

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

export class Props {
  userId?: UserId;

  @Transform(transformValueObject(UserName))
  name: UserName;

  @Transform(transformValueObject(UserLastName))
  lastName: UserLastName;

  @Transform(transformValueObject(UserBornDate))
  bornDate?: UserBornDate;

  @Transform(transformValueObject(UserTitle))
  title?: UserTitle;

  @Transform(transformValueObject(UserDescription))
  description?: UserDescription;

  @Transform(transformValueObject(UserUserName))
  username: UserUserName;

  @Transform(transformValueObject(UserEmail))
  email: UserEmail;

  @Transform(transformValueObject(UserPhone))
  phone: UserPhone;

  socialNetworks?: UserSocialNetwork[] | Collection<UserSocialNetwork>;
  education?: UserEducation[] | Collection<UserEducation>;
  workExperience?: UserWorkExperience[];
  skills?: UserSkill[];
}

@Entity()
export class User extends AggregateRoot<Props> implements Props {
  @PrimaryKey()
  public readonly _id: ObjectId;

  // @SerializedPrimaryKey()
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
