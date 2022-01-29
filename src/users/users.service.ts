import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
