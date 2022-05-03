import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoviesRepository } from '../movies/repository/movies-repository';
import { RatingsRepository } from './repository/ratings-repository';

@Module({
  controllers: [RatingsController],
  providers: [
    RatingsService,
    PrismaService,
    MoviesRepository,
    RatingsRepository,
  ],
})
export class RatingsModule {}
