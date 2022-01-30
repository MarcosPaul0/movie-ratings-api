import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ username, email, password }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      if (userAlreadyExists.deleted_at) {
        const userDisabled = await this.prismaService.user.update({
          where: { email },
          data: {
            deleted_at: null,
          },
        });

        return userDisabled;
      }

      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });
    }

    const newUser = await this.prismaService.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany();

    return allUsers;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }

  async update(
    id: string,
    { username, email, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        deleted_at: {
          not: null,
        },
      },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const updatedUser = await this.prismaService.user.update({
      where: { email },
      data: {
        username,
        email,
        password,
      },
    });

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this.prismaService.user.update({
        where: { id },
        data: { deleted_at: new Date() },
      });

      return deletedUser;
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }
}
