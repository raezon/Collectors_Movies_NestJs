import { IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  collectorId: number;
  @IsNumber()
  mark: number;
  @IsString()
  review: string;
}
