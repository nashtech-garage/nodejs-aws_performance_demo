import { Module } from '@nestjs/common';
import { PaymentOverviewService } from './payment-overview.service';
import { PaymentOverviewController } from './payment-overview.controller';

@Module({
  controllers: [PaymentOverviewController],
  providers: [PaymentOverviewService],
})
export class PaymentOverviewModule {}
