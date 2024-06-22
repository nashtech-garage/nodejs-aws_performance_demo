import { ApiProperty } from '@nestjs/swagger';

export class CreateSummaryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    total: number;

    @ApiProperty()
    percentage: number;
}
