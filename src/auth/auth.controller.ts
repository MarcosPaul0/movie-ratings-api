import {
  Controller,
  Post,
  UseGuards,
  Req,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { NestResponseBuilder } from '../core/http/nestResponseBuilder';
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

  @Get('confirm/:token')
  async receivedConfirmationAccountMail(
    @Param('token') token: string,
  ): Promise<NestResponse> {
    const validatedUser =
      await this.authService.receivedConfirmationAccountMail(token);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/users/${validatedUser.id}` })
      .setBody(validatedUser)
      .build();

    return response;
  }
}
