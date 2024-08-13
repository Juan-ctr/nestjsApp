import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsString()
    line2?: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;
}