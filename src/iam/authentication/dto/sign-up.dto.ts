import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @MinLength(10)
  password: string;
}
