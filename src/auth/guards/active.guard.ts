import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

interface UserRequestData {
  user: {
    id: string;
    email: string;
    is_active: boolean;
  };
}

export class ActiveGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<UserRequestData>();
    const user = request.user;

    return user.is_active;
  }
}
