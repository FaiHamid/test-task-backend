import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomJwtService } from '../services/jwt.services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: CustomJwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [, accessToken] = authHeader.split(' ');
    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    const userData = this.jwtService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = userData;

    return true;
  }
}
