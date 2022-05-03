import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import {
  mockCreateMovieInput,
  mockCreateMovieReturnController,
  mockCreateMovieReturnService,
  mockUpdateMovieReturnService,
  mockDeleteMovieReturnService,
  mockFindOneMovieReturnController,
  mockFindAllMovieReturnController,
  mockUpdateMovieInput,
  mockUpdateMovieReturnController,
  mockDeleteMovieReturnController,
} from './mocks';

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateMovieReturnService),
            findAll: jest.fn().mockReturnValue([mockCreateMovieReturnService]),
            findByName: jest.fn().mockReturnValue(mockCreateMovieReturnService),
            update: jest.fn().mockReturnValue(mockUpdateMovieReturnService),
            remove: jest.fn().mockReturnValue(mockDeleteMovieReturnService),
          },
        },
      ],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesController).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  describe('Create Movie', () => {
    it('should be create movie return successfully value', async () => {
      const response = await moviesController.create(mockCreateMovieInput);

      expect(response).toEqual(mockCreateMovieReturnController);
    });

    it('should be create movie throw a error', async () => {
      jest.spyOn(moviesService, 'create').mockRejectedValueOnce(new Error());

      expect(
        moviesController.create(mockCreateMovieInput),
      ).rejects.toThrowError();
    });
  });

  describe('Find Movie By Name', () => {
    it('should be find one movie return successfully value', async () => {
      const response = await moviesController.findByName({ name: 'test' });

      expect(response).toEqual(mockFindOneMovieReturnController);
    });

    it('should be find one movie throw a error', async () => {
      jest
        .spyOn(moviesService, 'findByName')
        .mockRejectedValueOnce(new Error());

      expect(
        moviesController.findByName({ name: 'test' }),
      ).rejects.toThrowError();
    });
  });

  describe('Find All Movie', () => {
    it('should be find all movie return successfully value', async () => {
      const response = await moviesController.findAll();

      expect(response).toEqual(mockFindAllMovieReturnController);
    });

    it('should be find all movie throw a error', async () => {
      jest.spyOn(moviesService, 'findAll').mockRejectedValueOnce(new Error());

      expect(moviesController.findAll()).rejects.toThrowError();
    });
  });

  describe('Update Movie', () => {
    it('should be update movie return successfully value', async () => {
      const response = await moviesController.update(
        'astkajrgpewoih087',
        mockUpdateMovieInput,
      );

      expect(response).toEqual(mockUpdateMovieReturnController);
    });

    it('should be update movie throw a error', async () => {
      jest.spyOn(moviesService, 'update').mockRejectedValueOnce(new Error());

      expect(
        moviesController.update('astkajrgpewoih087', mockUpdateMovieInput),
      ).rejects.toThrowError();
    });
  });

  describe('Delete Movie', () => {
    it('should be delete movie return successfully value', async () => {
      const response = await moviesController.remove('astkajrgpewoih087');

      expect(response).toEqual(mockDeleteMovieReturnController);
    });

    it('should be delete movie throw a error', async () => {
      jest.spyOn(moviesService, 'remove').mockRejectedValueOnce(new Error());

      expect(
        moviesController.remove('astkajrgpewoih087'),
      ).rejects.toThrowError();
    });
  });
});
