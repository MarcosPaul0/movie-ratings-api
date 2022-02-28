import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
