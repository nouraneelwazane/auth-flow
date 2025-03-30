import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDto {
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
