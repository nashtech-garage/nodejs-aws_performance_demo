import { ApiProperty } from '@nestjs/swagger';

enum profit_type {
    Sales=0,
    Revenue=1
}

export class CreateProfitDto {
    @ApiProperty()
    month: number;

    @ApiProperty()
    year: number;

    @ApiProperty()
    value: number;

    @ApiProperty()
    profit_type: profit_type;
}
