import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ score, user_id, movie_id }: CreateRatingDto): Promise<Rating> {
    try {
      const newRating = await this.prismaService.rating.create({
        data: {
          score,
          user_id,
          movie_id,
        },
      });

      return newRating;
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Rating already exists',
      });
    }
  }

  async findByUserId(user_id: string): Promise<Rating[]> {
    const allRatings = await this.prismaService.rating.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (!allRatings) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }

    return allRatings;
  }

  async findOne(id: string): Promise<Rating> {
    const rating = await this.prismaService.rating.findFirst({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }

    return rating;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    try {
      const updatedRating = await this.prismaService.rating.update({
        where: { id },
        data: updateRatingDto,
      });

      return updatedRating;
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.rating.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }
  }
}
