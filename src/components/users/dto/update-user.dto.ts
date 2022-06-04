import {
  IsNotEmpty,
  IsBoolean,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;
}
