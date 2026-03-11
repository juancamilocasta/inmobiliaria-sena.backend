import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GetAllRolesResponse } from './interfaces/rolesResponses.model';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getAllRoles(): Promise<GetAllRolesResponse> {
    return this.rolesService.getAllRoles();
  }
}
