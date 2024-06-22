import { Module } from '@nestjs/common';
import { UsedDeviceService } from './used-device.service';
import { UsedDeviceController } from './used-device.controller';

@Module({
  controllers: [UsedDeviceController],
  providers: [UsedDeviceService],
})
export class UsedDeviceModule {}
