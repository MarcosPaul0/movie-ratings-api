import { JwtAuthGuard } from '../guards/jwt.guard';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from '../guards/local.guard';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from '../guards/local.strategy';
import { JwtStrategy } from '../guards/jwt.strategy';
import { MailService } from '../mail/mail.service';
import { EncryptData } from '../utils/encrypt-data';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    MailService,
    EncryptData,
  ],
})
export class AuthModule {}
