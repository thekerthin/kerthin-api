import { ValueObjectDefaultProps } from '../../../../shared/domain/ValueObjectDefaultProps';
import { ValueObject } from '../../../../shared/domain/ValueObject';

type Props = ValueObjectDefaultProps<number>;

export class UserSkillScore extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  toValue(): number {
    return this.props.value;
  }

  validate(): void {}

  public static create(props: Props): UserSkillScore {
    return new UserSkillScore(props);
  }
}
