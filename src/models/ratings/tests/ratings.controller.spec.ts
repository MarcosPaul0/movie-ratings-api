import { Test, TestingModule } from '@nestjs/testing';
import { RatingsController } from '../ratings.controller';
import { RatingsService } from '../ratings.service';
import {
  mockCreateRatingInput,
  mockCreateRatingReturnController,
  mockCreateRatingReturnService,
  mockDeleteRatingReturnController,
  mockDeleteRatingReturnService,
  mockFindMyRatingsController,
  mockFindOneRatingController,
  mockFindRatingByUserIdController,
  mockUpdateRatingInput,
  mockUpdateRatingReturnController,
  mockUpdateRatingReturnService,
  mockUser,
} from './mocks';

describe('RatingsController', () => {
  let ratingsController: RatingsController;
  let ratingsService: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [
        {
          provide: RatingsService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateRatingReturnService),
            findMyRatings: jest
              .fn()
              .mockReturnValue([mockCreateRatingReturnService]),
            findByUserId: jest
              .fn()
              .mockReturnValue([mockCreateRatingReturnService]),
            findOne: jest.fn().mockReturnValue(mockCreateRatingReturnService),
            update: jest.fn().mockReturnValue(mockUpdateRatingReturnService),
            remove: jest.fn().mockReturnValue(mockDeleteRatingReturnService),
          },
        },
      ],
    }).compile();

    ratingsController = module.get<RatingsController>(RatingsController);
    ratingsService = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(ratingsController).toBeDefined();
    expect(ratingsService).toBeDefined();
  });

  describe('Create Rating', () => {
    it('should be create rating return successfully value', async () => {
      const response = await ratingsController.create(
        mockCreateRatingInput,
        mockUser,
      );

      expect(response).toEqual(mockCreateRatingReturnController);
    });

    it('should be create rating throw a error', async () => {
      jest.spyOn(ratingsService, 'create').mockRejectedValueOnce(new Error());

      expect(
        ratingsController.create(mockCreateRatingInput, mockUser),
      ).rejects.toThrowError();
    });
  });

  describe('Find My Ratings', () => {
    it('should be find my ratings return successfully value', async () => {
      const response = await ratingsController.findMyRatings(mockUser);

      expect(response).toEqual(mockFindMyRatingsController);
    });

    it('should be find my ratings throw a error', async () => {
      jest
        .spyOn(ratingsService, 'findByUserId')
        .mockRejectedValueOnce(new Error());

      expect(ratingsController.findMyRatings(mockUser)).rejects.toThrowError();
    });
  });

  describe('Find Ratings By User Id', () => {
    it('should be find ratings by user id return successfully value', async () => {
      const response = await ratingsController.findByUserId(mockUser.user.id);

      expect(response).toEqual(mockFindRatingByUserIdController);
    });

    it('should be find ratings by user id throw a error', async () => {
      jest
        .spyOn(ratingsService, 'findByUserId')
        .mockRejectedValueOnce(new Error());

      expect(
        ratingsController.findByUserId(mockUser.user.id),
      ).rejects.toThrowError();
    });
  });

  describe('Find One Rating', () => {
    it('should be find one rating return successfully value', async () => {
      const response = await ratingsController.findOne('erhiwojgorehg');

      expect(response).toEqual(mockFindOneRatingController);
    });

    it('should be find one rating throw a error', async () => {
      jest.spyOn(ratingsService, 'findOne').mockRejectedValueOnce(new Error());

      expect(ratingsController.findOne('erhiwojgorehg')).rejects.toThrowError();
    });
  });

  describe('Update Rating', () => {
    it('should be update rating return successfully value', async () => {
      const response = await ratingsController.update(
        'erhiwojgorehg',
        mockUpdateRatingInput,
        mockUser,
      );

      expect(response).toEqual(mockUpdateRatingReturnController);
    });

    it('should be update rating throw a error', async () => {
      jest.spyOn(ratingsService, 'update').mockRejectedValueOnce(new Error());

      expect(
        ratingsController.update(
          'erhiwojgorehg',
          mockUpdateRatingInput,
          mockUser,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('Delete Rating', () => {
    it('should be delete rating return successfully value', async () => {
      const response = await ratingsController.remove(
        'erhiwojgorehg',
        mockUser,
      );

      expect(response).toEqual(mockDeleteRatingReturnController);
    });

    it('should be delete rating throw a error', async () => {
      jest.spyOn(ratingsService, 'remove').mockRejectedValueOnce(new Error());

      expect(
        ratingsController.remove('erhiwojgorehg', mockUser),
      ).rejects.toThrowError();
    });
  });
});
