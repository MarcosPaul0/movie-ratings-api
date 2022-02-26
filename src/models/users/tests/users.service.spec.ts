import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../auth/auth.service';
import { PrismaService } from '../../../utils/prisma.service';
import { UsersService } from '../users.service';
import {
  mockCreateUserInput,
  mockCreateUserReturnService,
  mockRemoveUserReturnService,
  mockUpdateUserInput,
  mockUpdateUserReturnService,
} from './mocks';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockReturnValue(mockCreateUserReturnService),
              findFirst: jest.fn().mockReturnValue(mockCreateUserReturnService),
              findMany: jest
                .fn()
                .mockReturnValue([mockCreateUserReturnService]),
              update: jest.fn().mockReturnValue(mockUpdateUserReturnService),
            },
          },
        },
        {
          provide: AuthService,
          useValue: {
            sendConfirmationAccountMail: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('Create User', () => {
    it('should be create user return successfully value', async () => {
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(undefined);

      const response = await usersService.create(mockCreateUserInput);

      expect(response).toEqual(mockCreateUserReturnService);
      expect(authService.sendConfirmationAccountMail).toBeCalledTimes(1);
    });

    it('should be active user return successfully value', async () => {
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(mockRemoveUserReturnService);

      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValueOnce(mockCreateUserReturnService);

      const response = await usersService.create(mockCreateUserInput);

      expect(response).toEqual(mockCreateUserReturnService);
    });

    it('should be create user throw error user already exists', async () => {
      await expect(usersService.create(mockCreateUserInput)).rejects.toEqual(
        new BadRequestException('User already exists'),
      );
    });
  });

  describe('Find All Users', () => {
    it('should be find all users return successfully value', async () => {
      const response = await usersService.findAll();

      expect(response).toEqual([mockCreateUserReturnService]);
    });
  });

  describe('Find One User', () => {
    it('should be find one user return successfully value', async () => {
      const response = await usersService.findById('ugevfkhbwek');

      expect(response).toEqual(mockCreateUserReturnService);
    });

    it('should be find one user throw error not found', async () => {
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(undefined);

      await expect(usersService.findById('ugevfkhbwek')).rejects.toEqual(
        new NotFoundException('User not found'),
      );
    });
  });

  describe('Update User', () => {
    it('should be update user return successfully value', async () => {
      const response = await usersService.update(
        'ugevfkhbwek',
        mockUpdateUserInput,
      );

      expect(response).toEqual(mockUpdateUserReturnService);
    });

    it('should be update user throw error not found', async () => {
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(undefined);

      await expect(
        usersService.update('ugevfkhbwek', mockUpdateUserInput),
      ).rejects.toEqual(new NotFoundException('User not found'));
    });
  });

  describe('Delete User', () => {
    it('should be delete user return successfully value', async () => {
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValueOnce(mockRemoveUserReturnService);

      const response = await usersService.remove('ugevfkhbwek');

      expect(response).toEqual(mockRemoveUserReturnService);
    });

    it('should be delete user throw error not found', async () => {
      jest
        .spyOn(prismaService.user, 'update')
        .mockRejectedValueOnce(new Error());

      await expect(usersService.remove('ugevfkhbwek')).rejects.toEqual(
        new NotFoundException('User not found'),
      );
    });
  });
});
