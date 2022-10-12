import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    lon: number;

    @IsString()
    author: string

    @IsDate()
    @IsOptional()
    date_added:Date

}