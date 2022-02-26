import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { EncryptData } from '../../utils/encrypt-data';
import { PasswordPipe } from './password.pipe';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    MailService,
    JwtModule,
    EncryptData,
    PasswordPipe,
  ],
})
export class UsersModule {}
