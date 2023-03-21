import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiSecurity('Bearer')
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  @ApiSecurity('Bearer')
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  @ApiSecurity('Bearer')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Patch(':id')
  @ApiSecurity('Bearer')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  @ApiSecurity('Bearer')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
