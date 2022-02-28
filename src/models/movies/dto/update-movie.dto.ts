import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString({
    message: 'Field name is invalid format',
  })
  name?: string;

  @IsString({
    message: 'Field genre is invalid format',
  })
  genre?: string;

  @IsString({
    message: 'Field direction is invalid format',
  })
  direction?: string;

  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      message: 'Field budget is invalid format',
    },
  )
  budget?: number;

  @IsDate({
    message: 'Field launched_at is invalid format',
  })
  launched_at?: Date;
}
