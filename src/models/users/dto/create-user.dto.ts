import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is missing',
  })
  username: string;

  @IsNotEmpty({
    message: 'Username is missing',
  })
  @IsEmail(
    {},
    {
      message: 'Email is missing',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Username is missing',
  })
  password: string;
}
