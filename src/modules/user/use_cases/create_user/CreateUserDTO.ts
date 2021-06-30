import { Validate } from '../../../../shared/infra/http/decorators/Validate';

import { UserName } from '../../domain/value_objects/UserName';
import { UserLastName } from '../../domain/value_objects/UserLastName';
import { UserBornDate } from '../../domain/value_objects/UserBornDate';
import { UserTitle } from '../../domain/value_objects/UserTitle';
import { UserDescription } from '../../domain/value_objects/UserDescription';
import { UserUserName } from '../../domain/value_objects/UserUserName';
import { UserEmail } from '../../domain/value_objects/UserEmail';
import { UserPhone } from '../../domain/value_objects/UserPhone';
import { UserSocialNetwork } from '../../domain/UserSocialNetwork';
import { UserEducation } from '../../domain/UserEducation';
import { UserWorkExperience } from '../../domain/UserWorkExperience';
import { UserSkill } from '../../domain/UserSkill';

export class CreateUserDTO {
  @Validate(UserName)
  name: UserName;

  @Validate(UserLastName)
  lastName: UserLastName;

  @Validate(UserName)
  bornDate: UserBornDate;

  @Validate(UserTitle)
  title: UserTitle;

  @Validate(UserDescription)
  description: UserDescription;

  @Validate(UserUserName)
  username: UserUserName;

  @Validate(UserEmail)
  email: UserEmail;

  @Validate(UserPhone)
  phone: UserPhone;

  @Validate(UserSocialNetwork, { isArray: true })
  socialNetworks: UserSocialNetwork[];

  // @Validate(UserEducation, { isArray: true })
  // education: UserEducation[];

  // @Validate(UserWorkExperience, { isArray: true })
  // workExperience: UserWorkExperience[];

  // @Validate(UserSkill, { isArray: true })
  // skills: UserSkill[];
}
