import { Role } from '../entities/role.entity';

export interface GetAllRolesResponse {
  roles: Role[];
  statusCode: number;
}
