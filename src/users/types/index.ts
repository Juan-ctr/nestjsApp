import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  emailAddress: string;
  password: string;
}

export class SerializedUser {
  id: number;
  username: string;  
  emailAddress: string;


  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>){
    Object.assign(this, partial);
  } 
}
