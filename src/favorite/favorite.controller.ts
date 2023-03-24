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
  findAll(@Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.findAll({ userId });
  }

  @Get(':id')
  @ApiSecurity('Bearer')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.findOne(+id, userId);
  }

  @Patch(':id')
  @ApiSecurity('Bearer')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @Req() request,
  ) {
    const userId = request.user.sub;
    return this.favoriteService.update(+id, updateFavoriteDto, userId);
  }

  @Delete(':id')
  @ApiSecurity('Bearer')
  remove(@Param('id') id: string, @Req() request) {
    const userId = request.user.sub;
    return this.favoriteService.remove(+id);
  }
}
