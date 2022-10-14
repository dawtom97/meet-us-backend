import {IsDate, IsEmail, IsISO8601, IsOptional, IsString} from 'class-validator'

export class CreateUserDto {
    @IsString()
    name:string;

    @IsDate()
    @IsOptional()
    date_added:Date

    @IsString()
    password: string

    @IsEmail() 
    email:string

    @IsString()
    birthday_date: Date

    @IsString()
    @IsOptional()
    description:string;

    @IsString()
    @IsOptional()
    looking_for:[string];


}