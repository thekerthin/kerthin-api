import { ObjectId } from '@mikro-orm/mongodb';
// import * as uuid from 'uuid';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string | number | ObjectId> {
  constructor(id?: string | number | ObjectId) {
    // super(id ? id : uuid.v4());
    // TODO: validate if the entity is for relational or no-relational database
    super(id ? id : new ObjectId());
  }
}
