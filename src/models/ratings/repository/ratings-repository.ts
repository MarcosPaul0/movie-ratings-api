import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { Rating } from '../entities/rating.entity';
import { IRatingsRepository } from './i-ratings-repository';

export class RatingsRepository implements IRatingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserAndMovie(user_id: string, movie_id: string): Promise<Rating> {
    const allRatings = await this.prismaService.rating.findFirst({
      where: { user_id, movie_id },
    });

    return allRatings;
  }

  async updateById(id: string, { score }: UpdateRatingDto): Promise<Rating> {
    const updatedRating = await this.prismaService.rating.update({
      where: { id },
      data: { score },
    });

    return updatedRating;
  }

  async create({ movie_id, user_id, score }: CreateRatingDto): Promise<Rating> {
    const newRating = await this.prismaService.rating.create({
      data: {
        movie_id,
        user_id,
        score,
      },
    });

    return newRating;
  }

  async findByUserId(user_id: string): Promise<Rating[]> {
    const allRatings = await this.prismaService.rating.findMany({
      where: {
        user_id: user_id,
        deleted_at: null,
      },
    });

    return allRatings;
  }

  async findById(id: string): Promise<Rating> {
    const rating = await this.prismaService.rating.findFirst({
      where: { id, deleted_at: null },
    });

    return rating;
  }

  async findByIdAndUser(id: string, user_id: string): Promise<Rating> {
    const rating = await this.prismaService.rating.findFirst({
      where: { id, user_id, deleted_at: null },
    });

    return rating;
  }

  async findAll(): Promise<Rating[]> {
    const allRatings = this.prismaService.rating.findMany({
      where: { deleted_at: null },
    });

    return allRatings;
  }

  async softDelete(id: string): Promise<Rating> {
    const deletedRating = await this.prismaService.rating.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return deletedRating;
  }
}
