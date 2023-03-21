import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CollectorService } from './collector.service';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';

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

  @Get()
  @ApiSecurity('Bearer')
  findAll() {
    return this.collectorService.findAll();
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
