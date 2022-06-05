import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  confirm_password: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
