import { PartialType } from '@nestjs/mapped-types';
import { CreatePropiertyStateDto } from './create-propierty-state.dto';

export class UpdatePropiertyStateDto extends PartialType(CreatePropiertyStateDto) {}
