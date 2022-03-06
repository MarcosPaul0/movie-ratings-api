import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './i-users-repository';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: createUserDto,
    });

    return newUser;
  }

  async findById(id: string): Promise<User> {
    const userFound = await this.prismaService.user.findFirst({
      where: { id, deleted_at: null },
    });

    return userFound;
  }

  async findByEmail(email: string): Promise<User> {
    const userFound = await this.prismaService.user.findFirst({
      where: { email },
    });

    return userFound;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany({
      where: { deleted_at: null },
    });

    return allUsers;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { email },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async softDelete(id: string): Promise<User> {
    const deletedUser = await this.prismaService.user.update({
      where: { id },
      data: { deleted_at: new Date(), is_active: false },
    });

    return deletedUser;
  }
}
