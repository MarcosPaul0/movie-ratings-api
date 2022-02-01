import { Injectable } from '@nestjs/common';
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

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return `This action updates a #${id} movie`;
  }
}
