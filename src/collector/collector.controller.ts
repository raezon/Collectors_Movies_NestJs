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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CollectorService } from './collector.service';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';

enum Collector {
  movie = 'movie',
  serie = 'serie',
}

@ApiTags('Collector')
@Controller('collector')
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Post()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Create a collector that may be a movie or a serie',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Breaking bad',
          description: 'this is the name of the collector',
        },
        type: {
          type: 'string',
          example: 'movie',
          description: 'this type of collector can be movie or serie',
        },
        teaser: {
          type: 'string',
          example: 'https://www.youtube.com/watch?v=W1-BobfHVIc',
          description: 'this is a teaser of breaking bad',
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
  create(@Body() createCollectorDto: CreateCollectorDto) {
    return this.collectorService.create(createCollectorDto);
  }

  @Get('/search')
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Search on various collector by name',
  })
  @ApiQuery({ name: 'name' })
  search(@Query('name') name) {
    return this.collectorService.search(name);
  }

  @Get('/all')
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Get all collectors you may filter them by type (movie or serie)',
  })
  // @ApiParam({ name: 'type', type: String, required: false })
  @ApiQuery({ name: 'type', enum: Collector, required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  findAll(@Query() params) {
    return this.collectorService.findAll(params);
  }

  @Get(':id')
  @ApiSecurity('Bearer')
  findOne(@Param('id') id: string) {
    return this.collectorService.findOne(+id);
  }

  @Patch(':id')
  @ApiSecurity('Bearer')
  update(
    @Param('id') id: string,
    @Body() updateCollectorDto: UpdateCollectorDto,
  ) {
    return this.collectorService.update(+id, updateCollectorDto);
  }

  @Delete(':id')
  @ApiSecurity('Bearer')
  remove(@Param('id') id: string) {
    return this.collectorService.remove(+id);
  }
}
