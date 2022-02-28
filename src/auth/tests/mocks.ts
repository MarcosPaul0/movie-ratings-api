import { HttpStatus } from '@nestjs/common';
import { mockCreateUserReturnService } from '../../models/users/tests/mocks';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';

export const mockToken = 'ifhdgboie8.fh3847ifvoijngo32in.32847oguniodfh';

export const mockLoginReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockToken)
  .build();

export const mockReceivedConfirmationAccountMailReturnController =
  new NestResponseBuilder()
    .setStatus(HttpStatus.OK)
    .setHeaders({ Location: `/users/${mockCreateUserReturnService.id}` })
    .setBody(mockCreateUserReturnService)
    .build();
