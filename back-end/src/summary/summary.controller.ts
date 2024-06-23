import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Summary')
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  create(@Body() createSummaryDto: CreateSummaryDto) {
    return this.summaryService.create(createSummaryDto);
  }

  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    let result = this.summaryService.findAll();
    res.status(HttpStatus.OK);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.summaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSummaryDto: UpdateSummaryDto) {
    return this.summaryService.update(+id, updateSummaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.summaryService.remove(+id);
  }
}
