import { Injectable } from '@nestjs/common';
import { CreatePaymentOverviewDto } from './dto/create-payment-overview.dto';
import { UpdatePaymentOverviewDto } from './dto/update-payment-overview.dto';

@Injectable()
export class PaymentOverviewService {
  create(createPaymentOverviewDto: CreatePaymentOverviewDto) {
    return 'This action adds a new paymentOverview';
  }

  findAll() {
    return `This action returns all paymentOverview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentOverview`;
  }

  update(id: number, updatePaymentOverviewDto: UpdatePaymentOverviewDto) {
    return `This action updates a #${id} paymentOverview`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentOverview`;
  }
}
