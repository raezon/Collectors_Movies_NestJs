import { Module } from '@nestjs/common';
import { CollectorService } from './collector.service';
import { CollectorController } from './collector.controller';
import { PrismaService } from 'src/libraries/prisma/prisma.service';

@Module({
  controllers: [CollectorController],
  providers: [CollectorService, PrismaService],
})
export class CollectorModule {}
