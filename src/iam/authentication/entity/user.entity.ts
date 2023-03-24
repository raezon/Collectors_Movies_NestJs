import { IsString, MinLength } from 'class-validator';

export class User {
  @IsString()
  username: string;

  @MinLength(10)
  password: string;
}
