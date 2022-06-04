import { IsNotEmpty, IsBoolean, IsEmail, IsString, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsBoolean()
  is_active: boolean;
}
