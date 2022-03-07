import { IsNotEmpty, IsString } from 'class-validator';

export class FindByNameDto {
  @IsNotEmpty({
    message: 'Name is missing',
  })
  @IsString({
    message: 'Field name is invalid format',
  })
  name: string;
}
