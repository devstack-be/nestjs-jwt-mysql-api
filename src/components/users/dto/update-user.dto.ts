import { IsNotEmpty, IsBoolean, IsEmail, Allow } from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsBoolean()
  is_active: boolean;

  @Allow()
  firstname: string;

  @Allow()
  lastname: string;
}
