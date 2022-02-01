import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Movie[]> {
    const allMovies = await this.prismaService.movie.findMany();

    return allMovies;
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async findByName(name: string): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        name,
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

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
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
