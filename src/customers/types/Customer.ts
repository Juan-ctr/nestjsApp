import { Address } from './Address';

export interface Customer {
    id: number;
    emailAddress: string;
    name: string;
    address: Address;
}