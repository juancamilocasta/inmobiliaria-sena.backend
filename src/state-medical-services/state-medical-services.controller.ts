import { Body, Controller, Get, Post } from '@nestjs/common';
import { StateMedicalServicesService } from './state-medical-services.service';
import { CreateStateMedicalServicesDto } from './dto/create-state-change.dto';
import { CreateChangeStateChangeDto } from './dto/create-change-state-change.dto';

@Controller('state-medical-services')
export class StateMedicalServicesController {
  constructor(
    private readonly stateMedicalServicesService: StateMedicalServicesService,
  ) {}
  @Post('create-state-change')
  async createStateChange(
    @Body() createStateMedicalServicesChangeDto: CreateStateMedicalServicesDto,
  ) {
    return await this.stateMedicalServicesService.createChangeStateChange(
      createStateMedicalServicesChangeDto,
    );
  }

  @Get()
  async getStateChange() {
    return await this.stateMedicalServicesService.getStateChange();
  }
  @Post('create-state-medical-services-change')
  async createStateMedicalServicesChange(
    @Body() createChangeStateChangeDto: CreateChangeStateChangeDto,
  ) {
    return await this.stateMedicalServicesService.createStateMedicalServicesChange(
      createChangeStateChangeDto,
    );
  }
}
