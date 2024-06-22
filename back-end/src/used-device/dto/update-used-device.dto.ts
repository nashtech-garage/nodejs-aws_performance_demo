import { PartialType } from '@nestjs/swagger';
import { CreateUsedDeviceDto } from './create-used-device.dto';

export class UpdateUsedDeviceDto extends PartialType(CreateUsedDeviceDto) {}
