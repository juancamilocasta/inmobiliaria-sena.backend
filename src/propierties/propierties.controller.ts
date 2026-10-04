import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropiertiesService } from './propierties.service';
import { CreatePropiertyDto } from './dto/create-propierty.dto';
import { UpdatePropiertyDto } from './dto/update-propierty.dto';
import { Public } from 'src/decorators/public.decorator';
import { GetAllPropiertiesActivesFilterDto } from './dto/get-all-propierties-actives-filter.dto';
import { GetAllPropiertyAdminDto } from './dto/get-all-propierty-admin.dto';

@Controller('propierties')
export class PropiertiesController {
  constructor(private readonly propiertiesService: PropiertiesService) { }

  @Post()
  create(@Body() createPropiertyDto: CreatePropiertyDto) {

    return this.propiertiesService.createPropierty(createPropiertyDto);
  }

  @Post('admin')
  getAllPropierties(@Body() getAllPropiertyAdminDto: GetAllPropiertyAdminDto) {
    return this.propiertiesService.getAllPropierties(getAllPropiertyAdminDto);
  }
  @Public()
  @Post('actives')
  getAllActivePropierties(@Body() getAllPropiertiesActivesFilterDto: GetAllPropiertiesActivesFilterDto) {
    return this.propiertiesService.getAllPropiertiesActives(getAllPropiertiesActivesFilterDto);
  }

  @Post('/:idPropierty')
  update(@Param('idPropierty') id: string, @Body() updatePropiertyDto: UpdatePropiertyDto) {
    return this.propiertiesService.updatePropierty(+id, updatePropiertyDto);
  }
}
