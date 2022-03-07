import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

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
}
