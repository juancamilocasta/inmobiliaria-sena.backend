import { Controller } from '@nestjs/common';
import { ConfigCompanyService } from './config-company.service';

@Controller('config-company')
export class ConfigCompanyController {
  constructor(private readonly configCompanyService: ConfigCompanyService) {}
}
