import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarEventDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    from_date: Date;

    @ApiProperty()
    to_date: Date;
}
