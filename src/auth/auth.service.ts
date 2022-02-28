import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../models/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateAuthDto } from './dto/authenticate-user.dto';
import { MailService } from '../mail/mail.service';
import { EncryptData } from '../utils/encrypt-data';

interface ITokenPayload {
  sub: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly encryptDate: EncryptData,
  ) {}

  async authenticate({
    email,
    password,
  }: CreateAuthDto): Promise<User | false> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      return false;
    }

    const passwordHasMatch = await this.encryptDate.decrypt(
      password,
      user.password,
    );

    if (!passwordHasMatch) {
      return false;
    }

    return user;
  }

  async login({ id, email, is_admin, is_active }: LoginUserDto) {
    const token = this.jwtService.sign({ sub: id, email, is_admin, is_active });

    return { token };
  }

  sendConfirmationAccountMail({ id, email, username }) {
    const token = this.jwtService.sign(
      { sub: id },
      { secret: process.env.EMAIL_SECRET_TOKEN_KEY, expiresIn: '1h' },
    );

    try {
      this.mailService.sendConfirmationMail({
        email,
        name: username,
        url: `${process.env.APPLICATION_DOMAIN}/confirm/${token}`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async receivedConfirmationAccountMail(token: string): Promise<User> {
    try {
      const { sub } = await this.jwtService.verify(token, {
        secret: process.env.EMAIL_SECRET_TOKEN_KEY,
      });

      const validatedUser = await this.prismaService.user.update({
        where: { id: sub },
        data: { is_active: true },
      });

      return new User(validatedUser);
    } catch (error) {
      const { sub } = this.jwtService.decode(token) as ITokenPayload;

      const user = await this.prismaService.user.findFirst({
        where: { id: sub },
      });

      this.sendConfirmationAccountMail({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid confirmation',
      });
    }
  }
}
