import { ValueObjectProp } from '../../../../shared/domain/decorators/ValueObjectProp';
import { ValueObject as VO } from '../../../../shared/domain/decorators/ValueObject';
import { ValueObject } from '../../../../shared/domain/ValueObject';

export abstract class Props {
  @ValueObjectProp()
  value: number;
}

@VO(Props)
export class UserSkillScore extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  toValue(): number {
    return this.props.value;
  }

  public static create(props: Props): UserSkillScore {
    return new UserSkillScore(props);
  }
}
