import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MoviesRepository } from '../movies/repository/movies-repository';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingsRepository } from './repository/ratings-repository';
interface UserRequestData {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
}
@Injectable()
export class RatingsService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly ratingsRepository: RatingsRepository,
  ) {}

  async create({ score, user_id, movie_id }: CreateRatingDto): Promise<Rating> {
    const ratingAlreadyExists = await this.ratingsRepository.findByUserAndMovie(
      user_id,
      movie_id,
    );

    if (ratingAlreadyExists) {
      if (ratingAlreadyExists.deleted_at) {
        const newRating = await this.ratingsRepository.updateById(
          ratingAlreadyExists.id,
          {
            score,
            user_id,
            movie_id,
            deleted_at: null,
          },
        );

        await this.moviesRepository.updateStatisticData(movie_id, 1, score);

        return newRating;
      }

      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Rating already exists',
      });
    }

    const newRating = await this.ratingsRepository.create({
      score,
      user_id,
      movie_id,
    });

    await this.moviesRepository.updateStatisticData(movie_id, 1, score);

    return newRating;
  }

  async findByUserId(user_id: string): Promise<Rating[]> {
    const allRatings = await this.ratingsRepository.findByUserId(user_id);

    if (allRatings.length === 0 || !allRatings) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }

    return allRatings;
  }

  async findOne(id: string): Promise<Rating> {
    const rating = await this.ratingsRepository.findById(id);

    if (!rating) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }

    return rating;
  }

  async findAll(): Promise<Rating[]> {
    const allRatings = this.ratingsRepository.findAll();

    return allRatings;
  }

  async update(
    user: UserRequestData,
    id: string,
    { score }: UpdateRatingDto,
  ): Promise<Rating> {
    const rating = await this.ratingsRepository.findByIdAndUser(id, user.id);

    if (!rating) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }

    const updatedRating = await this.ratingsRepository.updateById(id, {
      score,
    });

    await this.moviesRepository.updateStatisticData(
      rating.movie_id,
      0,
      score - rating.score,
    );

    return updatedRating;
  }

  async remove(id: string, user_id: string): Promise<Rating> {
    const rating = await this.ratingsRepository.findByIdAndUser(id, user_id);

    if (!rating) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      });
    }

    const deletedRating = await this.ratingsRepository.softDelete(id);

    await this.moviesRepository.updateStatisticData(
      rating.movie_id,
      -1,
      -rating.score,
    );

    return deletedRating;
  }
}
