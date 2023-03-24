import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  username: string;

  @MinLength(10)
  password: string;
}
