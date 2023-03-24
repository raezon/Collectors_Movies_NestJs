import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/libraries/prisma/prisma.service';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';

@Injectable()
export class CollectorService {
  constructor(private prisma: PrismaService) {}

  findAll(params) {
    const { skipParam, takeParam, ...data } = params;
    const skip = skipParam ? skipParam : 0;
    const take = skipParam ? skipParam : 10;
    return this.prisma.collector.findMany({ skip, take, where: { ...data } });
  }
  search(value) {
    const data = this.prisma.collector.findMany({
      where: {
        name: {
          contains: value,
        },
      },
    });
    return data;
  }

  findOne(id: number) {
    const collector = this.prisma.collector.findUnique({
      where: { id },
    });

    if (!collector) {
      throw new NotFoundException(`Collector #${id} not found`);
    }

    return collector;
  }

  create(createCollectorDto: CreateCollectorDto) {
    return this.prisma.collector.create({ data: createCollectorDto });
  }

  update(id: number, updateCollectorDto: UpdateCollectorDto) {
    return this.prisma.collector.update({
      where: {
        id,
      },
      data: {
        ...updateCollectorDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.collector.delete({
      where: {
        id,
      },
    });
  }
}
