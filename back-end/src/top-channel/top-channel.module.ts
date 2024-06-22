import { Module } from '@nestjs/common';
import { TopChannelService } from './top-channel.service';
import { TopChannelController } from './top-channel.controller';

@Module({
  controllers: [TopChannelController],
  providers: [TopChannelService],
})
export class TopChannelModule {}
