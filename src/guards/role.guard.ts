import { CanActivate, ExecutionContext } from '@nestjs/common';

interface UserRequestData {
  user: {
    id: string;
    email: string;
    is_admin: boolean;
  };
}

export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<UserRequestData>();
    const user = request.user;

    if (user?.is_admin) {
      return true;
    }

    return false;
  }
}
