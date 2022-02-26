import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({
    message: 'Invalid username is format',
  })
  username?: string;

  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email?: string;

  @IsString({
    message: 'Invalid password is format',
  })
  password?: string;
}
