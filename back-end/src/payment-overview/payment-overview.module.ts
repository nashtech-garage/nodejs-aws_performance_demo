import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOverviewService } from './payment-overview.service';
import { PaymentOverviewController } from './payment-overview.controller';
import { PaymentOverview } from './entities/payment-overview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentOverview])],
  controllers: [PaymentOverviewController],
  providers: [PaymentOverviewService],
})
export class PaymentOverviewModule {}
