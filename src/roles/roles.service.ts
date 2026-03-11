import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { GetAllRolesResponse } from './interfaces/rolesResponses.model';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getAllRoles(): Promise<GetAllRolesResponse> {
    try {
      const roles = await this.roleRepository.find({
        where: {
          active: 1,
        },
      });

      if (roles.length === 0) {
        throw new HttpException('No existen roles', HttpStatus.NOT_FOUND);
      }

      return {
        roles: roles,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
