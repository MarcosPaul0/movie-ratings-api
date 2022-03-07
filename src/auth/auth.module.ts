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
import { EncryptData } from '../utils/encrypt-data';
import { SendMailService } from 'src/mail/send-mail.service';
import { BullModule } from '@nestjs/bull';
import { ActiveGuard } from 'src/guards/active.guard';
import { UsersRepository } from 'src/models/users/repository/user.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
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
    EncryptData,
    SendMailService,
    ActiveGuard,
    UsersRepository,
  ],
})
export class AuthModule {}
