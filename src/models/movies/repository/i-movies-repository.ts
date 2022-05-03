import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';

export interface IMoviesRepository {
  findByNameDirectionLaunched(
    name: string,
    direction: string,
    launched_at: Date,
  ): Promise<Movie>;
  create(createMovieDto: CreateMovieDto): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  findByName(name: string): Promise<Movie[]>;
  findById(id: string): Promise<Movie>;
  updateById(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie>;
  updateStatisticData(
    id: string,
    increment: number,
    score: number,
  ): Promise<Movie>;
  softDelete(id: string): Promise<Movie>;
}
