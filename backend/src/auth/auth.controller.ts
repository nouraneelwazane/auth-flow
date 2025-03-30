import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() authInputDto: AuthInputDto) {
    return this.authService.authenticate(authInputDto);
  }

  @UseGuards(AuthGuard)
  @Get('userData')
  getUserData(@Request() request) {
    return request.user;
  }
}
