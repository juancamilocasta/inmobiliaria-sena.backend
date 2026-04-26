import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropiertyStatesService } from './propierty-states.service';
import { CreatePropiertyStateDto } from './dto/create-propierty-state.dto';
import { UpdatePropiertyStateDto } from './dto/update-propierty-state.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('propierty-states')
export class PropiertyStatesController {
  constructor(private readonly propiertyStatesService: PropiertyStatesService) { }

  @Post()
  create(@Body() createPropiertyStateDto: CreatePropiertyStateDto) {
    return this.propiertyStatesService.createState(createPropiertyStateDto);
  }
  @Get('actives')
  getAllStatesActives() {
    return this.propiertyStatesService.getAllStatesActives();
  }
}
