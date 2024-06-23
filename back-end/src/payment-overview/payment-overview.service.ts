import { Injectable } from '@nestjs/common';
import { CreatePaymentOverviewDto } from './dto/create-payment-overview.dto';
import { UpdatePaymentOverviewDto } from './dto/update-payment-overview.dto';
import { Repository } from 'typeorm';
import { PaymentOverview } from './entities/payment-overview.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentOverviewService {
  constructor(
    @InjectRepository(PaymentOverview)
    private repository: Repository<PaymentOverview>,
  ) {}

  create(createPaymentOverviewDto: CreatePaymentOverviewDto) {
    return this.repository.save(createPaymentOverviewDto);
  }

  findAll(): Promise<PaymentOverview[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<PaymentOverview | null> {
    return this.repository.findOneBy({id});
  }

  update(id: number, updatePaymentOverviewDto: UpdatePaymentOverviewDto) {
    return this.repository.update(id, updatePaymentOverviewDto);
  }

  remove(id: number) {
    return this.repository.delete({id});
  }
}
