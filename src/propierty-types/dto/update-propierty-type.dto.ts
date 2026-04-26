import { PartialType } from '@nestjs/mapped-types';
import { CreatePropiertyTypeDto } from './create-propierty-type.dto';

export class UpdatePropiertyTypeDto extends PartialType(CreatePropiertyTypeDto) {}
