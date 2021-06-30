import { ValueObjectProp } from '../../../../shared/domain/decorators/ValueObjectProp';
import { ValueObject as VO } from '../../../../shared/domain/decorators/ValueObject';
import { ValueObject } from '../../../../shared/domain/ValueObject';

export abstract class Props {
  @ValueObjectProp()
  value: string;
}

@VO(Props)
export class UserSocialNetworkDescription extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  toValue(): string {
    return this.props.value;
  }

  public static create(props: Props): UserSocialNetworkDescription {
    return new UserSocialNetworkDescription(props);
  }
}
