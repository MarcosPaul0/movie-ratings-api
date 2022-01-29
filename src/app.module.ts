import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestResponseInterceptor } from './core/http/nestResponse.interceptor';
import { HttpExceptionFilter } from './common/filters/httpException.filter';

@Module({
  imports: [UsersModule, MoviesModule, RatingsModule],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NestResponseInterceptor,
    },
  ],
})
export class AppModule {}
