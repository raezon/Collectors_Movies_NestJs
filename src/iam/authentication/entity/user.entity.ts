import { IsEmail, MinLength } from 'class-validator';

export class User {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
