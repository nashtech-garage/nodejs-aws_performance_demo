import { PartialType } from '@nestjs/swagger';
import { CreateTopChannelDto } from './create-top-channel.dto';

export class UpdateTopChannelDto extends PartialType(CreateTopChannelDto) {}
