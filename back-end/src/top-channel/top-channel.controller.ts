import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopChannelService } from './top-channel.service';
import { CreateTopChannelDto } from './dto/create-top-channel.dto';
import { UpdateTopChannelDto } from './dto/update-top-channel.dto';

@Controller('top-channel')
export class TopChannelController {
  constructor(private readonly topChannelService: TopChannelService) {}

  @Post()
  create(@Body() createTopChannelDto: CreateTopChannelDto) {
    return this.topChannelService.create(createTopChannelDto);
  }

  @Get()
  findAll() {
    return this.topChannelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topChannelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopChannelDto: UpdateTopChannelDto) {
    return this.topChannelService.update(+id, updateTopChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topChannelService.remove(+id);
  }
}
