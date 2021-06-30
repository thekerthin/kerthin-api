import { User } from '../User';
import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvent';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;

  constructor(public readonly user: User) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateId(): UniqueEntityID {
    // return this.user.reactIssueNoteId.id;
    return null;
  }
}
