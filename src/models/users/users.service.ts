import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EncryptData } from '../../utils/encrypt-data';
import { AuthService } from '../../auth/auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly encryptData: EncryptData,
  ) {}

  async create({ username, email, password }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      if (userAlreadyExists.deleted_at) {
        const activeUser = await this.prismaService.user.update({
          where: { email },
          data: {
            username,
            email,
            password,
            deleted_at: null,
          },
        });

        await this.authService.sendConfirmationAccountMail({
          id: activeUser.id,
          email,
          username,
        });

        return new User(activeUser);
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

    await this.authService.sendConfirmationAccountMail({
      id: newUser.id,
      email,
      username,
    });

    return new User(newUser);
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany({
      where: { deleted_at: null },
    });

    return allUsers.map((user) => new User(user));
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { id, deleted_at: null },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return new User(user);
  }

  async update(
    id: string,
    { username, email, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const passwordHash = password
      ? await this.encryptData.encrypt(password, 10)
      : undefined;

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        username,
        email,
        password: password && passwordHash,
      },
    });

    return new User(updatedUser);
  }

  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this.prismaService.user.update({
        where: { id },
        data: { deleted_at: new Date(), is_active: false },
      });

      return new User(deletedUser);
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }
}
