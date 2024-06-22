import { Test, TestingModule } from '@nestjs/testing';
import { PaymentOverviewController } from './payment-overview.controller';
import { PaymentOverviewService } from './payment-overview.service';

describe('PaymentOverviewController', () => {
  let controller: PaymentOverviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentOverviewController],
      providers: [PaymentOverviewService],
    }).compile();

    controller = module.get<PaymentOverviewController>(PaymentOverviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
