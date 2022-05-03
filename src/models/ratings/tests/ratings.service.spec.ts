import { Test, TestingModule } from '@nestjs/testing';
import { mockUpdateMovieReturnService } from '../../movies/tests/mocks';
import { RatingsService } from '../ratings.service';
import {
  mockCreateRatingInput,
  mockCreateRatingReturnService,
  mockDeleteRatingReturnService,
  mockUpdateRatingInput,
  mockUpdateRatingReturnService,
  mockUser,
} from './mocks';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from '../../../models/movies/repository/movies-repository';
import { RatingsRepository } from '../repository/ratings-repository';

describe('RatingsService', () => {
  let ratingsService: RatingsService;
  let moviesRepository: MoviesRepository;
  let ratingsRepository: RatingsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: MoviesRepository,
          useValue: {
            updateStatisticData: jest
              .fn()
              .mockReturnValue(mockUpdateMovieReturnService),
          },
        },
        {
          provide: RatingsRepository,
          useValue: {
            findByUserAndMovie: jest
              .fn()
              .mockReturnValue(mockCreateRatingReturnService),
            updateById: jest
              .fn()
              .mockReturnValue(mockUpdateRatingReturnService),
            create: jest.fn().mockReturnValue(mockCreateRatingReturnService),
            findByUserId: jest
              .fn()
              .mockReturnValue([mockCreateRatingReturnService]),
            findById: jest.fn().mockReturnValue(mockCreateRatingReturnService),
            findAll: jest.fn().mockReturnValue([mockCreateRatingReturnService]),
            findByIdAndUser: jest
              .fn()
              .mockReturnValue(mockCreateRatingReturnService),
            softDelete: jest
              .fn()
              .mockReturnValue(mockDeleteRatingReturnService),
          },
        },
      ],
    }).compile();

    ratingsService = module.get<RatingsService>(RatingsService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
    ratingsRepository = module.get<RatingsRepository>(RatingsRepository);
  });

  it('should be defined', () => {
    expect(ratingsService).toBeDefined();
    expect(moviesRepository).toBeDefined();
    expect(ratingsRepository).toBeDefined();
  });

  describe('Create Rating', () => {
    it('should be create rating return successfully value', async () => {
      jest
        .spyOn(ratingsRepository, 'findByUserAndMovie')
        .mockResolvedValueOnce(undefined);

      const response = await ratingsService.create(mockCreateRatingInput);

      expect(response).toEqual(mockCreateRatingReturnService);
      expect(ratingsRepository.create).toBeCalledTimes(1);
      expect(moviesRepository.updateStatisticData).toBeCalledTimes(1);
    });

    it('should be update rating return successfully value', async () => {
      jest
        .spyOn(ratingsRepository, 'findByUserAndMovie')
        .mockResolvedValueOnce(mockDeleteRatingReturnService);

      const response = await ratingsService.create(mockCreateRatingInput);

      expect(response).toEqual(mockUpdateRatingReturnService);
      expect(ratingsRepository.updateById).toBeCalledTimes(1);
      expect(moviesRepository.updateStatisticData).toBeCalledTimes(1);
    });

    it('should be create movie throw a error', async () => {
      await expect(
        ratingsService.create(mockCreateRatingInput),
      ).rejects.toEqual(new BadRequestException('Rating already exists'));
    });
  });

  describe('Find Ratings By User Id', () => {
    it('should be find ratings by user id return successfully value', async () => {
      const response = await ratingsService.findByUserId('eiuwtbgljebgt');

      expect(response).toEqual([mockCreateRatingReturnService]);
    });

    it('should be find ratings by user id throw a error', async () => {
      jest.spyOn(ratingsRepository, 'findByUserId').mockResolvedValueOnce([]);

      await expect(
        ratingsService.findByUserId('eiuwtbgljebgt'),
      ).rejects.toEqual(new NotFoundException('Rating not found'));
    });
  });

  describe('Find One Rating', () => {
    it('should be find one rating return successfully value', async () => {
      const response = await ratingsService.findOne('eiuwtbgljebgt');

      expect(response).toEqual(mockCreateRatingReturnService);
    });

    it('should be find one rating throw a error', async () => {
      jest
        .spyOn(ratingsRepository, 'findById')
        .mockResolvedValueOnce(undefined);

      await expect(ratingsService.findOne('eiuwtbgljebgt')).rejects.toEqual(
        new NotFoundException('Rating not found'),
      );
    });
  });

  describe('Update Rating', () => {
    it('should be update rating return successfully value', async () => {
      const response = await ratingsService.update(
        mockUser.user,
        'eiuwtbgljebgt',
        mockUpdateRatingInput,
      );

      expect(response).toEqual(mockUpdateRatingReturnService);
      expect(moviesRepository.updateStatisticData).toBeCalledTimes(1);
    });

    it('should be update rating throw a error', async () => {
      jest
        .spyOn(ratingsRepository, 'findByIdAndUser')
        .mockResolvedValueOnce(undefined);

      await expect(
        ratingsService.update(
          mockUser.user,
          'eiuwtbgljebgt',
          mockUpdateRatingInput,
        ),
      ).rejects.toEqual(new NotFoundException('Rating not found'));
    });
  });

  describe('Delete Rating', () => {
    it('should be delete rating return successfully value', async () => {
      jest
        .spyOn(ratingsRepository, 'findByIdAndUser')
        .mockResolvedValueOnce(mockDeleteRatingReturnService);

      const response = await ratingsService.remove(
        mockUser.user.id,
        'eiuwtbgljebgt',
      );

      expect(response).toEqual(mockDeleteRatingReturnService);
      expect(moviesRepository.updateStatisticData).toBeCalledTimes(1);
    });

    it('should be delete rating throw a error', async () => {
      jest
        .spyOn(ratingsRepository, 'findByIdAndUser')
        .mockResolvedValueOnce(undefined);

      await expect(
        ratingsService.remove(mockUser.user.id, 'eiuwtbgljebgt'),
      ).rejects.toEqual(new NotFoundException('Rating not found'));
    });
  });
});
