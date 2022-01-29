import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, MoviesModule, RatingsModule],
  providers: [PrismaService],
})
export class AppModule {}
