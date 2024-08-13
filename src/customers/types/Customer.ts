import { Address } from './Address';

export interface Customer {
    id: number;
    email: string;
    name: string;
    address: Address;
}