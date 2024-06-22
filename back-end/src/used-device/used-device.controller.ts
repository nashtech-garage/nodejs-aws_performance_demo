import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsedDeviceService } from './used-device.service';
import { CreateUsedDeviceDto } from './dto/create-used-device.dto';
import { UpdateUsedDeviceDto } from './dto/update-used-device.dto';

@Controller('used-device')
export class UsedDeviceController {
  constructor(private readonly usedDeviceService: UsedDeviceService) {}

  @Post()
  create(@Body() createUsedDeviceDto: CreateUsedDeviceDto) {
    return this.usedDeviceService.create(createUsedDeviceDto);
  }

  @Get()
  findAll() {
    return this.usedDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usedDeviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsedDeviceDto: UpdateUsedDeviceDto) {
    return this.usedDeviceService.update(+id, updateUsedDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usedDeviceService.remove(+id);
  }
}
