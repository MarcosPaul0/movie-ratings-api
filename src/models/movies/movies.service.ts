import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    name,
    direction,
    genre,
    budget,
    launched_at,
  }: CreateMovieDto): Promise<Movie> {
    const movieAlreadyExists = await this.prismaService.movie.findFirst({
      where: {
        name,
        direction,
        launched_at,
        deleted_at: null,
      },
    });

    if (movieAlreadyExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Movie already exists',
      });
    }

    const newMovie = await this.prismaService.movie.create({
      data: {
        name,
        direction,
        genre,
        budget,
        launched_at,
      },
    });

    return newMovie;
  }

  async findAll(): Promise<Movie[]> {
    const allMovies = await this.prismaService.movie.findMany({
      where: { deleted_at: null },
    });

    return allMovies;
  }

  async findByName(name: string): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        name,
        deleted_at: null,
      },
    });

    if (!movies) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie not found',
      });
    }

    return movies;
  }

  async update(
    id: string,
    { name, genre, direction, launched_at, budget }: UpdateMovieDto,
  ): Promise<Movie> {
    const movieFound = await this.prismaService.movie.findFirst({
      where: { id, deleted_at: null },
    });

    if (!movieFound) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie not found',
      });
    }

    const updatedMovie = await this.prismaService.movie.update({
      where: { id },
      data: { name, genre, direction, launched_at, budget },
    });

    return updatedMovie;
  }

  async remove(id: string): Promise<Movie> {
    const movieFound = await this.prismaService.movie.findFirst({
      where: { id, deleted_at: null },
    });

    if (!movieFound) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie not found',
      });
    }

    const deletedMovie = await this.prismaService.movie.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return deletedMovie;
  }
}
