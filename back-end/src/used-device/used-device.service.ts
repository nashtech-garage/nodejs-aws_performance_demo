import { Injectable } from '@nestjs/common';
import { CreateUsedDeviceDto } from './dto/create-used-device.dto';
import { UpdateUsedDeviceDto } from './dto/update-used-device.dto';

@Injectable()
export class UsedDeviceService {
  create(createUsedDeviceDto: CreateUsedDeviceDto) {
    return 'This action adds a new usedDevice';
  }

  findAll() {
    return `This action returns all usedDevice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usedDevice`;
  }

  update(id: number, updateUsedDeviceDto: UpdateUsedDeviceDto) {
    return `This action updates a #${id} usedDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} usedDevice`;
  }
}
