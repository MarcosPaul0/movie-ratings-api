import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { RoleGuard } from '../../auth/guards/role.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<NestResponse> {
    const newMovie = await this.moviesService.create(createMovieDto);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/movies/${newMovie.name}` })
      .setBody(newMovie)
      .build();

    return response;
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<NestResponse> {
    const allMovies = await this.moviesService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allMovies)
      .build();

    return response;
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':name')
  async findByName(@Body('name') id: string): Promise<NestResponse> {
    const movies = await this.moviesService.findByName(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(movies)
      .build();

    return response;
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<NestResponse> {
    const updatedMovie = await this.moviesService.update(id, updateMovieDto);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/movies/${updatedMovie.name}` })
      .setBody(updatedMovie)
      .build();

    return response;
  }
}
