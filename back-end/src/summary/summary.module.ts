import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { Summary } from './entities/summary.entity';
import { SummarySubscriber } from './summary.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Summary])],
  controllers: [SummaryController],
  providers: [SummaryService, SummarySubscriber],
})
export class SummaryModule {}
