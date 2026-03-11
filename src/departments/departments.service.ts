import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { GetDepartmentByIdDto } from './dto/get-department-by-id.dto';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger('DepartmentsService');
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async getDepartments() {
    try {
      const departments = await this.departmentRepository.find();
      if (departments.length === 0) {
        throw new HttpException(
          'No existen departamentos',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        departments,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getDepartmentById(getDepartmentByIdDto: GetDepartmentByIdDto) {
    try {
      const { idDepartment } = getDepartmentByIdDto;

      const department = await this.departmentRepository.findOne({
        where: { idDepartment: idDepartment },
        relations: { municipalities: true },
      });
      if (!department) {
        throw new HttpException(
          'No existen datos para el departamento',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        department,
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
