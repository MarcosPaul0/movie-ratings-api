import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { Rating } from '../entities/rating.entity';

export interface IRatingsRepository {
  findByUserAndMovie(user_id: string, movie_id: string): Promise<Rating>;
  updateById(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating>;
  create(createUserDto: CreateUserDto): Promise<Rating>;
  findByUserId(user_id: string): Promise<Rating[]>;
  findById(id: string): Promise<Rating>;
  updateByUserAndId(user_id: string, id: string): Promise<Rating>;
  softDelete(id: string): Promise<Rating>;
}
