import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Transform, Type } from 'class-transformer';

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
import { UserSocialNetwork, Props as UserSocialNetworkProps } from './UserSocialNetwork';
import { UserEducation, Props as UserEducationProps } from './UserEducation';
import { UserWorkExperience, Props as UserWorkExperienceProps } from './UserWorkExperience';
import { UserSkill, UserSkill as UserSkillProps } from './UserSkill';

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

  @Type(() => UserSocialNetworkProps)
  socialNetworks?: UserSocialNetwork[];

  @Type(() => UserEducationProps)
  education?: UserEducation[];

  @Type(() => UserWorkExperienceProps)
  workExperience?: UserWorkExperience[];

  @Type(() => UserSkillProps)
  skills?: UserSkill[];
}

@Entity({ tableName: 'users' })
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
  socialNetworks: UserSocialNetwork[];

  @OneToMany(() => UserEducation, (education) => education.user)
  education: UserEducation[];

  @OneToMany(() => UserWorkExperience, (we) => we.user)
  workExperience: UserWorkExperience[];

  @OneToMany(() => UserSkill, (skill) => skill.user)
  skills: UserSkill[];

  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: Props, id?: UniqueEntityID): User {
    const isNew = !!id === false;

    // TODO: this could be improved
    if (Array.isArray(props.socialNetworks) && props.socialNetworks.length > 0) {
      props.socialNetworks = props.socialNetworks.map((sn) => UserSocialNetwork.create(sn));
    }
    // TODO: this could be improved
    if (Array.isArray(props.education) && props.education.length > 0) {
      props.education = props.education.map((e) => UserEducation.create(e));
    }
    // TODO: this could be improved
    if (Array.isArray(props.workExperience) && props.workExperience.length > 0) {
      props.workExperience = props.workExperience.map((we) => UserWorkExperience.create(we));
    }
    // TODO: this could be improved
    if (Array.isArray(props.skills) && props.skills.length > 0) {
      props.skills = props.skills.map((s) => UserSkill.create(s));
    }

    const user = new User({ ...props }, id);

    if (isNew) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}

export default User;
