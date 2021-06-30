import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export namespace CreateMemberErrors {
  export class UserDoesNotExistError extends UseCaseError {
    constructor(baseUserId: string) {
      super(`A user for user id ${baseUserId} doesn't exist or was deleted.`);
    }
  }

  export class MemberAlreadyExistsError extends UseCaseError {
    constructor(baseUserId: string) {
      super(`Member for ${baseUserId} already exists.`);
    }
  }
}
