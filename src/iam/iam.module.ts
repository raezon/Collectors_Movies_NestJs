import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { PrismaService } from '../libraries/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'hard!to-guess_secret',
      }),
    }),
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    AuthenticationService,
    PrismaService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
