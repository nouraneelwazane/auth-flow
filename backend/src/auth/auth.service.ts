import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { SignInData } from './model/sign-in-data.model';
import { AuthToken } from './model/auth-token.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(authInputDto: AuthInputDto): Promise<AuthToken | null> {
    const user: SignInData | null =
      await this.usersService.findByEmailAndPassword(
        authInputDto.email,
        authInputDto.password,
      );
    return this.generateAuthenticationToken(user);
  }

  async generateAuthenticationToken(
    signInData: SignInData,
  ): Promise<AuthToken | null> {
    const accessToken: string = await this.jwtService.signAsync(signInData);
    return {
      accessToken,
    };
  }
}
