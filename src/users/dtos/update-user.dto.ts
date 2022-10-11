import {IsDate, IsEmail, IsOptional, IsString} from 'class-validator'

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username:string;

    @IsDate()
    @IsOptional()
    date_added:Date

    @IsString()
    @IsOptional()
    description:string;

    @IsString()
    @IsOptional()
    looking_for:[string];

}