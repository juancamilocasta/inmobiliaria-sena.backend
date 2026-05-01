import { PartialType } from '@nestjs/mapped-types';
import { CreatePropiertyImageDto } from './create-propierty-image.dto';

export class UpdatePropiertyImageDto extends PartialType(CreatePropiertyImageDto) {}
