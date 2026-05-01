import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropiertyImagesService } from './propierty-images.service';
import { CreatePropiertyImageDto } from './dto/create-propierty-image.dto';
import { UpdatePropiertyImageDto } from './dto/update-propierty-image.dto';

@Controller('propierty-images')
export class PropiertyImagesController {
  constructor(private readonly propiertyImagesService: PropiertyImagesService) { }

  @Post()
  create(@Body() createPropiertyImageDto: CreatePropiertyImageDto) {
    return this.propiertyImagesService.createImages(createPropiertyImageDto);
  }

  @Get(':id')
  deleteImage(@Param('id') id: number) {
    return this.propiertyImagesService.deleteImage(id);
  }
}

