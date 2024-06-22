import { ApiProperty } from '@nestjs/swagger';

enum pyament_type {
    Receive=0,
    Due=1
}

export class CreatePaymentOverviewDto {
    @ApiProperty()
    month: number;

    @ApiProperty()
    year: number;

    @ApiProperty()
    value: number;

    @ApiProperty()
    payment_type: pyament_type;
}
