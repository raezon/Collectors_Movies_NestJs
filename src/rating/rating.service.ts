import { Injectable, NotFoundException } from '@nestjs/common';
import { Collector, Rating } from '@prisma/client';
import { PrismaService } from 'src/libraries/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}
  async findTopFive(argument) {
    // All posts with ratings data
    const collectors = await this.prisma.$queryRawUnsafe(`

SELECT DISTINCT  c.id, c.name, c.type, c.teaser, r.avg_marks
    FROM "public"."Collector" c
    inner join
    (
        select  "collectorId", avg("mark") AS avg_marks
        from "public"."Rating"
        group by "public"."Rating"."collectorId"
        ORDER BY avg_marks desc
    ) as r
        on c.id = r."collectorId"
        where type = '${argument.type}'
        ORDER BY avg_marks desc
        LIMIT 5
    
    `);

    /**     */
    return collectors;
  }
}
