
import { IsEmail, IsInt, IsString } from 'class-validator';

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  // dto para validación de entrada
  export class CreateUserDto implements User {
    @IsInt()
    id: number;
  
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  }
  