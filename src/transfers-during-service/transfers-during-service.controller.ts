import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransfersDuringServiceService } from './transfers-during-service.service';
import { CreateTransfersDuringServiceDto } from './dto/create-transfers-during-service.dto';
import { UpdateTransfersDuringServiceDto } from './dto/update-transfers-during-service.dto';

@Controller('transfers-during-service')
export class TransfersDuringServiceController {
  constructor(
    private readonly transfersDuringServiceService: TransfersDuringServiceService,
  ) {}

  @Post('/:idMedicalService')
  createTransferDuringService(
    @Param('idMedicalService') idMedicalService: string,
    @Body() createTransfersDuringServiceDto: CreateTransfersDuringServiceDto,
  ) {
    return this.transfersDuringServiceService.createTransferDuringService(
      idMedicalService,
      createTransfersDuringServiceDto,
    );
  }
  @Post('/:idTransferDuringService')
  updateTransferDuringService(
    @Param('idTransferDuringService') idTransferDuringService: number,
    @Body() updateTransferDuringService: UpdateTransfersDuringServiceDto,
  ) {
    return this.transfersDuringServiceService.updateTransferDuringService(
      idTransferDuringService,
      updateTransferDuringService,
    );
  }
  @Get('/:idMedicalService')
  getTransfersDuringService(
    @Param('idMedicalService') idMedicalService: string,
  ) {
    return this.transfersDuringServiceService.getTransfersDuringService(
      idMedicalService,
    );
  }
}
