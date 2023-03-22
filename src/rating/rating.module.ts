import { Module } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaService } from 'src/libraries/prisma/prisma.service';
import { RatingBuisnessLogicController } from './rating-buisness-logic.controller';

@Module({
  controllers: [RatingController, RatingBuisnessLogicController],
  providers: [RatingRepository, RatingService, PrismaService],
})
export class RatingModule {}
