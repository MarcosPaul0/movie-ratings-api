import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is missing',
  })
  username: string;

  @IsNotEmpty({
    message: 'Email is missing',
  })
  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Password is missing',
  })
  password: string;
}
