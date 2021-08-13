import { PaginationResult } from '../../../../shared/infra/database/paginationResult';
import { UserDTO } from '../../dtos/UserDTO';

export class FindUsersDTO extends PaginationResult<UserDTO> {}
