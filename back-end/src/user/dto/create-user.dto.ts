import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    full_name: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    total_post: number;

    @ApiProperty()
    total_followers: number;

    @ApiProperty()
    total_following: number;

    @ApiProperty()
    about_me: string;

    @ApiProperty()
    avatar_path: string;

    @ApiProperty()
    phone: string;
}
