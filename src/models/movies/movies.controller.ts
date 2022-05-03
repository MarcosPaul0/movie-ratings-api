import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../../guards/role.guard';
import { FindByNameDto } from './dto/find-by-name.dto';

@ApiTags('Movies')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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

  @Get()
  async findAll(): Promise<NestResponse> {
    const allMovies = await this.moviesService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allMovies)
      .build();

    return response;
  }

  @Get('one')
  async findByName(@Body() { name }: FindByNameDto): Promise<NestResponse> {
    const movies = await this.moviesService.findByName(name);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(movies)
      .build();

    return response;
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<NestResponse> {
    const deletedMovie = await this.moviesService.remove(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedMovie)
      .build();

    return response;
  }
}
