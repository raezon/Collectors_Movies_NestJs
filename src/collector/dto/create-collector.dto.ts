import { IsNumber, IsString } from 'class-validator';

export class CreateCollectorDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  teaser: string;
}
