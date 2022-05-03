import { CreateRatingDto } from '../dto/create-rating.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { Rating } from '../entities/rating.entity';

export interface IRatingsRepository {
  findByUserAndMovie(user_id: string, movie_id: string): Promise<Rating>;
  updateById(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating>;
  create(createRatingDto: CreateRatingDto): Promise<Rating>;
  findByUserId(user_id: string): Promise<Rating[]>;
  findById(id: string): Promise<Rating>;
  findByIdAndUser(id: string, user_id: string): Promise<Rating>;
  findAll(): Promise<Rating[]>;
  softDelete(id: string): Promise<Rating>;
}
