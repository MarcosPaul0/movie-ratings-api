import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EncryptData } from '../../utils/encrypt-data';
import { PasswordPipe } from './password.pipe';
import { SendMailService } from 'src/mail/send-mail.service';
import { BullModule } from '@nestjs/bull';
import { RoleGuard } from 'src/guards/role.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    JwtModule,
    EncryptData,
    PasswordPipe,
    SendMailService,
    RoleGuard,
  ],
})
export class UsersModule {}
