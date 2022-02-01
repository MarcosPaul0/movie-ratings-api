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

  async findAll() {
    return `This action returns all movies`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
