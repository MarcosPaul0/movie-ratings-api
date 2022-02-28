import { IsNotEmpty, IsNumber } from 'class-validator';

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
  score: number;
}
