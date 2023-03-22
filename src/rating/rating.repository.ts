import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/libraries/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingRepository {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.rating.findMany();
  }

  findOne(id: number) {
    const rating = this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating #${id} not found`);
    }

    return rating;
  }

  create(createRatingDto: CreateRatingDto) {
    return this.prisma.rating.create({ data: createRatingDto });
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return this.prisma.rating.update({
      where: {
        id,
      },
      data: {
        ...updateRatingDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.rating.delete({
      where: {
        id,
      },
    });
  }
  //additional
}
