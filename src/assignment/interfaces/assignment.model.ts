import { Assignment } from '../entities/assignment.entity';

export interface GetAssignmentResponse {
  assignment: Assignment[];
  statusCode: number;
}
export interface GetAssignmentResquest {
  limit: number;
  page: number;
  wordsFilter: string;
}
