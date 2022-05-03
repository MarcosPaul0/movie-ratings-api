import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { IMoviesRepository } from './i-movies-repository';

export class MoviesRepository implements IMoviesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByNameDirectionLaunched(
    name: string,
    direction: string,
    launched_at: Date,
  ): Promise<Movie> {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        name: name.toLowerCase(),
        direction,
        launched_at: new Date(launched_at),
        deleted_at: null,
      },
    });

    return movie;
  }

  async create({
    name,
    direction,
    launched_at,
    genre,
    budget,
  }: CreateMovieDto): Promise<Movie> {
    const newMovie = await this.prismaService.movie.create({
      data: {
        name: name.toLowerCase(),
        direction: direction.toLowerCase(),
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
        name: {
          contains: name.toLowerCase(),
        },
        deleted_at: null,
      },
    });

    return movies;
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findFirst({
      where: { id, deleted_at: null },
    });

    return movie;
  }

  async updateById(
    id: string,
    { budget, direction, genre, launched_at, name }: UpdateMovieDto,
  ): Promise<Movie> {
    const updatedMovie = await this.prismaService.movie.update({
      where: { id },
      data: {
        name: name?.toLowerCase(),
        genre,
        direction: direction?.toLowerCase(),
        launched_at,
        budget,
      },
    });

    return updatedMovie;
  }

  async updateStatisticData(
    id: string,
    increment: number,
    score: number,
  ): Promise<Movie> {
    const updatedMovie = await this.prismaService.movie.update({
      where: { id },
      data: {
        total_number_ratings: {
          increment: increment,
        },
        total_rating: {
          increment: score,
        },
      },
    });

    return updatedMovie;
  }

  async softDelete(id: string): Promise<Movie> {
    const deletedMovie = await this.prismaService.movie.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return deletedMovie;
  }
}
