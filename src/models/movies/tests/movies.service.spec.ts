import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { MoviesRepository } from '../repository/movies-repository';
import {
  mockCreateMovieInput,
  mockCreateMovieReturnService,
  mockDeleteMovieReturnService,
  mockUpdateMovieInput,
  mockUpdateMovieReturnService,
} from './mocks';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let moviesRepository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MoviesRepository,
          useValue: {
            findByNameDirectionLaunched: jest
              .fn()
              .mockReturnValue(mockCreateMovieReturnService),
            create: jest.fn().mockReturnValue(mockCreateMovieReturnService),
            findAll: jest.fn().mockReturnValue([mockCreateMovieReturnService]),
            findByName: jest
              .fn()
              .mockReturnValue([mockCreateMovieReturnService]),
            findById: jest.fn().mockReturnValue(mockCreateMovieReturnService),
            updateById: jest.fn().mockReturnValue(mockUpdateMovieReturnService),
            softDelete: jest.fn().mockReturnValue(mockDeleteMovieReturnService),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(moviesRepository).toBeDefined();
  });

  describe('Create Movie', () => {
    it('should be create movie return successfully value', async () => {
      jest
        .spyOn(moviesRepository, 'findByNameDirectionLaunched')
        .mockResolvedValueOnce(undefined);

      const response = await moviesService.create(mockCreateMovieInput);

      expect(response).toEqual(mockCreateMovieReturnService);
    });

    it('should be create movie throw a error', async () => {
      await expect(moviesService.create(mockCreateMovieInput)).rejects.toEqual(
        new BadRequestException('Movie already exists'),
      );
    });
  });

  describe('Find All Movies', () => {
    it('should be find all movies return successfully value', async () => {
      const response = await moviesService.findAll();

      expect(response).toEqual([mockCreateMovieReturnService]);
    });
  });

  describe('Find Movie By Name', () => {
    it('should be find movie by name return successfully value', async () => {
      const response = await moviesService.findByName('test');

      expect(response).toEqual([mockCreateMovieReturnService]);
    });

    it('should be find movie by name throw a error', async () => {
      jest.spyOn(moviesRepository, 'findByName').mockResolvedValueOnce([]);

      await expect(moviesService.findByName('test')).rejects.toEqual(
        new NotFoundException('Movie not found'),
      );
    });
  });

  describe('Update Movie', () => {
    it('should be update movie return successfully value', async () => {
      const response = await moviesService.update(
        'astkajrgpewoih087',
        mockUpdateMovieInput,
      );

      expect(response).toEqual(mockUpdateMovieReturnService);
    });

    it('should be update movie throw a error', async () => {
      jest.spyOn(moviesRepository, 'findById').mockResolvedValueOnce(undefined);

      await expect(
        moviesService.update('astkajrgpewoih087', mockUpdateMovieInput),
      ).rejects.toEqual(new NotFoundException('Movie not found'));
    });
  });

  describe('Delete Movie', () => {
    it('should be delete movie return successfully value', async () => {
      jest
        .spyOn(moviesRepository, 'softDelete')
        .mockResolvedValueOnce(mockDeleteMovieReturnService);

      const response = await moviesService.remove('astkajrgpewoih087');

      expect(response).toEqual(mockDeleteMovieReturnService);
    });

    it('should be delete movie throw a error', async () => {
      jest.spyOn(moviesRepository, 'findById').mockResolvedValueOnce(undefined);

      await expect(moviesService.remove('astkajrgpewoih087')).rejects.toEqual(
        new NotFoundException('Movie not found'),
      );
    });
  });
});
