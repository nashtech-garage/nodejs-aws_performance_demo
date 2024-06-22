import { Test, TestingModule } from '@nestjs/testing';
import { PaymentOverviewService } from './payment-overview.service';

describe('PaymentOverviewService', () => {
  let service: PaymentOverviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentOverviewService],
    }).compile();

    service = module.get<PaymentOverviewService>(PaymentOverviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
