import { IsEmpty, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateRatingDto {
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

  @IsEmpty()
  user_id?: string;

  @IsEmpty()
  movie_id?: string;

  @IsEmpty()
  deleted_at?: null | Date;
}
