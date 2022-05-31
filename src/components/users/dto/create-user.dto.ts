import { IsNotEmpty, IsBoolean, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsBoolean()
  is_active: boolean;
}
