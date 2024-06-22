import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    sold: number;

    @ApiProperty()
    profit: number;
}
