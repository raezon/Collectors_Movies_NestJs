import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/libraries/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  findAll(params, type) {
    let otherRestrictions = {};
    if (type) {
      otherRestrictions = {
        Collector: {
          type,
        },
      };
    }
    return this.prisma.favorite.findMany({
      where: { ...params, ...otherRestrictions },
      include: { Collector: true },
    });
  }

  findOne(id: number, userId: number) {
    const favorite = this.prisma.favorite.findFirst({
      where: { id, userId },
      include: {
        User: true,
      },
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite #${id} not found`);
    }

    return favorite;
  }

  create(createFavoriteDto: CreateFavoriteDto, userId) {
    console.log({ ...createFavoriteDto, userId });
    return this.prisma.favorite.create({
      data: { ...createFavoriteDto, userId },
    });
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto, userId) {
    const isMe = this.prisma.favorite.findFirst({
      where: { id, userId },
    });

    if (!isMe) {
      throw new NotFoundException(
        `You can not update this favorite is not yours`,
      );
    }
    return this.prisma.favorite.update({
      where: {
        id,
      },
      data: {
        ...updateFavoriteDto,
      },
    });
  }

  remove(id: number, userId) {
    const isMe = this.prisma.favorite.findFirst({
      where: { id, userId },
    });

    if (!isMe) {
      throw new NotFoundException(
        `You can not delete this favorite is not yours`,
      );
    }
    return this.prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}
