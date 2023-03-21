import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectorService } from './collector.service';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';

@Controller('collector')
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Post()
  create(@Body() createCollectorDto: CreateCollectorDto) {
    return this.collectorService.create(createCollectorDto);
  }

  @Get()
  findAll() {
    return this.collectorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectorDto: UpdateCollectorDto) {
    return this.collectorService.update(+id, updateCollectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectorService.remove(+id);
  }
}
