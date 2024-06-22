import { ApiProperty } from '@nestjs/swagger';

enum enum_status {
    UnPaid=0,
    Pending=1,
    Paid=2,
}

export class CreateShopPackageDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    invoice_date: Date;

    @ApiProperty()
    status: enum_status = enum_status.UnPaid;

    @ApiProperty()
    is_delete: boolean = false;
}
