import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { User } from '../models/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateAuthDto } from './dto/authenticateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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

    const passwordHasMatch = await compare(password, user.password);

    if (!passwordHasMatch) {
      return false;
    }

    return user;
  }

  async login({ id, email }: LoginUserDto) {
    const token = this.jwtService.sign({ sub: id, email });

    return { token };
  }
}
