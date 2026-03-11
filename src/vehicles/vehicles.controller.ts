import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }
  @Post('update/:idVehicle')
  updateVehicle(
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Param('idVehicle') idVehicle: number,
  ) {
    return this.vehiclesService.updateVehicle(idVehicle, updateVehicleDto);
  }
  @Get()
  findAllActives() {
    return this.vehiclesService.findAll('0');
  }
  @Get('/:showWithInactives')
  findAll(@Param('showWithInactives') showWithInactives: string) {
    return this.vehiclesService.findAll(showWithInactives);
  }
}
