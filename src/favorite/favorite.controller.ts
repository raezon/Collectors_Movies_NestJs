import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Add movie to the favorite list',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        collectorId: {
          type: 'number',
          example: '1',
          description:
            'this is the foreign key tha represent the movie with title Everything Everywhere All at Once',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'saved...',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden You should be authenticated',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.create(createFavoriteDto, userId);
  }

  @Get()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary:
      'Get all my personal favorite i will not get other people favorite',
  })
  findAll(@Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.findAll({ userId });
  }

  @Get(':id')
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary:
      'Get a detail of  favorite  by id ,i will not get other people favorite',
  })
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.findOne(+id, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a collector from my favorite, i will not remove only from my favorite',
  })
  @ApiSecurity('Bearer')
  remove(@Param('id') id: string, @Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.remove(+id, userId);
  }
}
