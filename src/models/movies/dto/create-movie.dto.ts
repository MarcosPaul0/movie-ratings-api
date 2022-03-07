import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({
    message: 'Name is missing',
  })
  @IsString({
    message: 'Field name is invalid format',
  })
  name: string;

  @IsNotEmpty({
    message: 'Genre is missing',
  })
  @IsString({
    message: 'Field genre is invalid format',
  })
  genre: string;

  @IsNotEmpty({
    message: 'Direction is missing',
  })
  @IsString({
    message: 'Field direction is invalid format',
  })
  direction: string;

  @IsNotEmpty({
    message: 'Budget is missing',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      message: 'Field budget is invalid format',
    },
  )
  budget: number;

  @IsNotEmpty({
    message: 'Launched date is missing',
  })
  @IsString({
    message: 'Field launched_at is invalid format',
  })
  launched_at: Date;
}
