import { User } from '../entities/user.entity';

export interface GetAllUserResponse {
  users: User[];
  statusCode: number;
}
