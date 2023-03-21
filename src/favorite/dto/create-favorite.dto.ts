import { IsNumber, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  collectorId: number;
}
