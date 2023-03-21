import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiSecurity('Bearer')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  @ApiSecurity('Bearer')
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  @ApiSecurity('Bearer')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  @ApiSecurity('Bearer')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  @ApiSecurity('Bearer')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
