import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/libraries/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.favorite.findMany();
  }

  findOne(id: number) {
    const favorite = this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite #${id} not found`);
    }

    return favorite;
  }

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.prisma.favorite.create({ data: createFavoriteDto });
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return this.prisma.favorite.update({
      where: {
        id,
      },
      data: {
        ...updateFavoriteDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}
