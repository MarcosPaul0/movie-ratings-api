import { ActiveGuard } from '../../guards/active.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

interface UserRequestData {
  user: {
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
    is_active: boolean;
  };
}

@ApiTags('Ratings')
@ApiBearerAuth()
@UseGuards(ActiveGuard)
@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  async create(
    @Body() createRatingDto: CreateRatingDto,
    @Req() { user }: UserRequestData,
  ): Promise<NestResponse> {
    const newRating = await this.ratingsService.create({
      ...createRatingDto,
      user_id: user.id,
    });

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/ratings/${newRating.id}` })
      .setBody(newRating)
      .build();

    return response;
  }

  @Get('my')
  async findMyRatings(@Req() { user }: UserRequestData): Promise<NestResponse> {
    const allRatings = await this.ratingsService.findByUserId(user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allRatings)
      .build();

    return response;
  }

  @Get('user/:id')
  async findByUserId(@Param('id') id: string): Promise<NestResponse> {
    const allRatings = await this.ratingsService.findByUserId(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allRatings)
      .build();

    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NestResponse> {
    const rating = await this.ratingsService.findOne(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(rating)
      .build();

    return response;
  }

  @Get()
  async findAll(): Promise<NestResponse> {
    const allRatings = await this.ratingsService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allRatings)
      .build();

    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @Req() { user }: UserRequestData,
  ): Promise<NestResponse> {
    const updatedRating = await this.ratingsService.update(
      user,
      id,
      updateRatingDto,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/ratings/${updatedRating.id}` })
      .setBody(updatedRating)
      .build();

    return response;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() { user }: UserRequestData,
  ): Promise<NestResponse> {
    const deletedRating = await this.ratingsService.remove(id, user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedRating)
      .build();

    return response;
  }
}
