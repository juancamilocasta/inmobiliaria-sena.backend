import { Controller, Get } from '@nestjs/common';
import { OriginAttentionService } from './origin-attention.service';

@Controller('origin-attention')
export class OriginAttentionController {
  constructor(
    private readonly originAttentionService: OriginAttentionService,
  ) {}

  @Get()
  findAllOriginAttention() {
    return this.originAttentionService.findAllOriginAttention();
  }
}
