import { Controller, Post, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nestReponseBuilder';
import { NestResponse } from '../core/http/nestResponse';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

interface UserRequestData {
  user: {
    id: string;
    email: string;
    is_admin: boolean;
  };
}
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }: UserRequestData): Promise<NestResponse> {
    const token = await this.authService.login({
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
    });

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(token)
      .build();

    return response;
  }
}
