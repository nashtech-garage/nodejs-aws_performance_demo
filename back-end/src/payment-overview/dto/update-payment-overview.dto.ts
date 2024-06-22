import { PartialType } from '@nestjs/swagger';
import { CreatePaymentOverviewDto } from './create-payment-overview.dto';

export class UpdatePaymentOverviewDto extends PartialType(CreatePaymentOverviewDto) {}
