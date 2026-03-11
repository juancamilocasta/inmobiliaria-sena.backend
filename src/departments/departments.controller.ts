import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { GetDepartmentByIdDto } from './dto/get-department-by-id.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}
  @Get()
  getDepartments() {
    return this.departmentService.getDepartments();
  }
  @Get('/:idDepartment')
  getDepartmentById(@Param() getDepartmentByIdDto: GetDepartmentByIdDto) {
    return this.departmentService.getDepartmentById(getDepartmentByIdDto);
  }
}
