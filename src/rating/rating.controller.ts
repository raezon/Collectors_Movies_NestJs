import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingRepository: RatingRepository) {}

  @Post()
  @ApiSecurity('Bearer')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingRepository.create(createRatingDto);
  }

  @Get()
  @ApiSecurity('Bearer')
  findAll() {
    return this.ratingRepository.findAll();
  }

  @Get(':id')
  @ApiSecurity('Bearer')
  findOne(@Param('id') id: string) {
    return this.ratingRepository.findOne(+id);
  }

  @Patch(':id')
  @ApiSecurity('Bearer')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingRepository.update(+id, updateRatingDto);
  }

  @Delete(':id')
  @ApiSecurity('Bearer')
  remove(@Param('id') id: string) {
    return this.ratingRepository.remove(+id);
  }
}
