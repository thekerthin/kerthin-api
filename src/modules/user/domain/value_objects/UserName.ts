import { isEmptyOrNil } from '@kerthin/utils';

import { ValueObjectDefaultProps } from '../../../../shared/domain/ValueObjectDefaultProps';
import { ValueObject } from '../../../../shared/domain/ValueObject';

type Props = ValueObjectDefaultProps<string>;

export class UserName extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  toValue(): string {
    return this.props.value;
  }

  validate(): void {
    if (isEmptyOrNil(this.props.value)) {
      throw new Error('The user name field cannot be empty.');
    }
  }

  public static create(props: Props): UserName {
    return new UserName(props);
  }
}
