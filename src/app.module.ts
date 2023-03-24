import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './libraries/prisma/prisma.service';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { FavoriteModule } from './favorite/favorite.module';
import { CollectorModule } from './collector/collector.module';

@Module({
  imports: [ConfigModule.forRoot(), IamModule, FavoriteModule, CollectorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
