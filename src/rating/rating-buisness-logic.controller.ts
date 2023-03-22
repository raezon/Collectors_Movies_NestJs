import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { RatingService } from './rating.service';

@ApiTags('Rating')
@Controller('top-movie')
export class RatingBuisnessLogicController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('/topFiveMovie')
  @ApiOperation({
    summary: 'Get tope five movies according to the mark',
  })
  @ApiSecurity('Bearer')
  topFiveMovie() {
    return this.ratingService.findTopFive({ type: 'movie' });
  }

  @Get('/topFiveSerie')
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Get tope five serie according to the mark',
  })
  topFiveSerie() {
    return this.ratingService.findTopFive({ type: 'serie' });
  }
}
