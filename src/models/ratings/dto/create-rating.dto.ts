import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty({
    message: 'Field score is required',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      message: 'Field score is invalid format',
    },
  )
  @Min(0, {
    message: 'Score must be at least 0',
  })
  @Max(10, {
    message: 'Score must be at most 10',
  })
  score: number;

  @IsNotEmpty({
    message: 'Field movie_id is required',
  })
  @IsString({
    message: 'Field movie_id is invalid format',
  })
  movie_id: string;

  @IsOptional()
  @IsString({
    message: 'Field user_id is invalid format',
  })
  user_id?: string;
}
