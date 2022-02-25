import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({
    message: 'Email is missing',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is missing',
  })
  password: string;
}
