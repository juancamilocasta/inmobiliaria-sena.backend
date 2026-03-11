import { Body, Controller, Param, Post } from '@nestjs/common';
import { ChecklistTabTamService } from './checklist-tab-tam.service';
import { CreateChecklistTabTamDto } from './dto/create-checklist-tab-tam.dto';
import { UpdateChecklistTabTamDto } from './dto/update-checklist-tab-tam.dto';

@Controller('checklist-tab-tam')
export class ChecklistTabTamController {
  constructor(
    private readonly checklistTabTamService: ChecklistTabTamService,
  ) {}

  @Post()
  create(@Body() createChecklistTabTamDto: CreateChecklistTabTamDto) {
    return this.checklistTabTamService.create(createChecklistTabTamDto);
  }
  @Post('/:idCheckListTabTam')
  update(
    @Param('idCheckListTabTam') idCheckListTabTam: string,
    @Body()
    updateChecklistTabTamDto: UpdateChecklistTabTamDto,
  ) {
    return this.checklistTabTamService.update(
      idCheckListTabTam,
      updateChecklistTabTamDto,
    );
  }
}
