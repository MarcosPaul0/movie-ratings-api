import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { MoviesModule } from './models/movies/movies.module';
import { RatingsModule } from './models/ratings/ratings.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestResponseInterceptor } from './core/http/nestResponse.interceptor';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, MoviesModule, RatingsModule, AuthModule],
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
