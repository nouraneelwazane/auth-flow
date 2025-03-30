import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInData } from '../model/sign-in-data.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload: SignInData = await this.jwtService.verifyAsync(token);
      request.user = {
        userId: tokenPayload.userId,
        name: tokenPayload.name,
      };
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
