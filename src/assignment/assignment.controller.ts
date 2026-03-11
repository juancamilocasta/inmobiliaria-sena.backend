import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { ApiBasicResponse } from 'src/interfaces/response-general-requests.model';
import { GetAssignmentResponse } from './interfaces/assignment.model';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  createAssignment(
    @Body() createAssignmentDto: CreateAssignmentDto,
  ): Promise<ApiBasicResponse> {
    return this.assignmentService.createAssignment(createAssignmentDto);
  }

  @Get()
  getAssignment(): Promise<GetAssignmentResponse> {
    return this.assignmentService.getAssignment();
  }

  @Post('update/:idAssignment')
  updateAssignment(
    @Param('idAssignment') idAssignment: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.updateAssignment(
      idAssignment,
      updateAssignmentDto,
    );
  }
}
