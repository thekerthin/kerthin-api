import { ValueObjectDefaultProps } from '../../../../shared/domain/ValueObjectDefaultProps';
import { ValueObject } from '../../../../shared/domain/ValueObject';

type Props = ValueObjectDefaultProps<string>;

export class UserTitle extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  toValue(): string {
    return this.props.value;
  }

  validate(): void {}

  public static create(props: Props): UserTitle {
    return new UserTitle(props);
  }
}
