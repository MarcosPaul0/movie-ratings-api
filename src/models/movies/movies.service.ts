import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesRepository } from './repository/movies-repository';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async create({
    name,
    direction,
    genre,
    budget,
    launched_at,
  }: CreateMovieDto): Promise<Movie> {
    const movieAlreadyExists =
      await this.moviesRepository.findByNameDirectionLaunched(
        name,
        direction,
        launched_at,
      );

    if (movieAlreadyExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Movie already exists',
      });
    }

    const newMovie = await this.moviesRepository.create({
      name,
      direction,
      genre,
      budget,
      launched_at,
    });

    return newMovie;
  }

  async findAll(): Promise<Movie[]> {
    const allMovies = await this.moviesRepository.findAll();

    return allMovies;
  }

  async findByName(name: string): Promise<Movie[]> {
    const movies = await this.moviesRepository.findByName(name);

    if (movies.length === 0 || !movies) {
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
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie not found',
      });
    }

    const updatedMovie = await this.moviesRepository.updateById(id, {
      name,
      genre,
      direction,
      launched_at,
      budget,
    });

    return updatedMovie;
  }

  async remove(id: string): Promise<Movie> {
    const movieFound = await this.moviesRepository.findById(id);

    if (!movieFound) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie not found',
      });
    }

    const deletedMovie = await this.moviesRepository.softDelete(id);

    return deletedMovie;
  }
}
