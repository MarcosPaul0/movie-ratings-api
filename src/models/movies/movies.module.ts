import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { MoviesRepository } from './repository/movies-repository';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService, MoviesRepository],
})
export class MoviesModule {}
