import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumberString,
    ValidateNested,
    IsString,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';

export class CreateCustomerDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNumberString()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
        
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;
}