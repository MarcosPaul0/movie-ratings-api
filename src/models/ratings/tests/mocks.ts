import { HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from '../../../core/http/nestResponseBuilder';

export const mockUser = {
  user: {
    id: 'fhbewoig',
    username: 'test',
    email: 'test@test.com',
    is_admin: false,
    is_active: true,
  },
};

export const mockCreateRatingInput = {
  score: 1,
  movie_id: 'eiuwtbgljebgt',
};

export const mockCreateRatingReturnService = {
  ...mockCreateRatingInput,
  id: 'erhiwojgorehg',
  user_id: mockUser.user.id,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const mockCreateRatingReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({ Location: `/ratings/${mockCreateRatingReturnService.id}` })
  .setBody(mockCreateRatingReturnService)
  .build();

export const mockFindMyRatingsController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateRatingReturnService])
  .build();

export const mockFindRatingByUserIdController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateRatingReturnService])
  .build();

export const mockFindOneRatingController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateRatingReturnService)
  .build();

export const mockUpdateRatingInput = {
  score: 2,
};

export const mockUpdateRatingReturnService = {
  ...mockCreateRatingReturnService,
  score: 2,
};

export const mockUpdateRatingReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({ Location: `/ratings/${mockUpdateRatingReturnService.id}` })
  .setBody(mockUpdateRatingReturnService)
  .build();

export const mockDeleteRatingReturnService = {
  ...mockCreateRatingReturnService,
  deleted_at: new Date(),
};

export const mockDeleteRatingReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockDeleteRatingReturnService)
  .build();
