import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const allMovies = await this.prismaService.movie.findMany();

    return allMovies;
  }

  async findByName(name: string): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        name,
      },
    });

    return movies;
  }

  async update(
    id: string,
    { name, genre, direction, launched_at, budget }: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      const updatedMovie = await this.prismaService.movie.update({
        where: { id },
        data: { name, genre, direction, launched_at, budget },
      });

      return updatedMovie;
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie not found',
      });
    }
  }
}
