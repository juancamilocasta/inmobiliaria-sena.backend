import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropiertyTypesService } from './propierty-types.service';
import { CreatePropiertyTypeDto } from './dto/create-propierty-type.dto';
import { UpdatePropiertyTypeDto } from './dto/update-propierty-type.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('propierty-types')
export class PropiertyTypesController {
  constructor(private readonly propiertyTypesService: PropiertyTypesService) { }

  @Post()
  create(@Body() createPropiertyTypeDto: CreatePropiertyTypeDto) {
    return this.propiertyTypesService.createPropiertyType(createPropiertyTypeDto);
  }
  @Public()
  @Get('actives')
  findAll() {
    return this.propiertyTypesService.getAllPropiertyTypesActives();
  }

}
