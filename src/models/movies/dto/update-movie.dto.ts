import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString({
    message: 'Field name is invalid format',
  })
  name?: string;

  @IsOptional()
  @IsString({
    message: 'Field genre is invalid format',
  })
  genre?: string;

  @IsOptional()
  @IsString({
    message: 'Field direction is invalid format',
  })
  direction?: string;

  @IsOptional()
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

  @IsOptional()
  @IsString({
    message: 'Field launched_at is invalid format',
  })
  launched_at?: Date;
}
