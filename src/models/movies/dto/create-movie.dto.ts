import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({
    message: 'Name is missing',
  })
  name: string;

  @IsNotEmpty({
    message: 'Genre is missing',
  })
  genre: string;

  @IsNotEmpty({
    message: 'Direction is missing',
  })
  direction: string;

  @IsNotEmpty({
    message: 'Budget is missing',
  })
  budget: number;

  @IsNotEmpty({
    message: 'Launched date is missing',
  })
  launched_at: Date;
}
