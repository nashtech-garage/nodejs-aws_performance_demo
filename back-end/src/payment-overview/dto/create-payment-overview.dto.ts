import { ApiProperty } from '@nestjs/swagger';
import { payment_type  } from '../enum/payment.enum';

export class CreatePaymentOverviewDto {
    @ApiProperty()
    month: number;

    @ApiProperty()
    year: number;

    @ApiProperty()
    value: number;

    @ApiProperty({enum: payment_type})
    payment_type: payment_type;
}
