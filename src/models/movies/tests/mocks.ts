import { HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from '../../../core/http/nestResponseBuilder';

export const mockCreateMovieInput = {
  name: 'test',
  genre: 'test',
  direction: 'test',
  budget: 1.34,
  launched_at: new Date(),
};

export const mockCreateMovieReturnService = {
  id: 'astkajrgpewoih087',
  ...mockCreateMovieInput,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const mockCreateMovieReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({ Location: `/movies/${mockCreateMovieReturnService.name}` })
  .setBody(mockCreateMovieReturnService)
  .build();

export const mockFindOneMovieReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateMovieReturnService)
  .build();

export const mockFindAllMovieReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateMovieReturnService])
  .build();

export const mockUpdateMovieInput = {
  name: 'test2',
  updated_at: new Date(),
};

export const mockUpdateMovieReturnService = {
  ...mockCreateMovieReturnService,
  ...mockUpdateMovieInput,
};

export const mockUpdateMovieReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setHeaders({ Location: `/movies/${mockUpdateMovieReturnService.name}` })
  .setBody(mockUpdateMovieReturnService)
  .build();

export const mockDeleteMovieReturnService = {
  ...mockCreateMovieReturnService,
  deleted_at: new Date(),
};

export const mockDeleteMovieReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockDeleteMovieReturnService)
  .build();
