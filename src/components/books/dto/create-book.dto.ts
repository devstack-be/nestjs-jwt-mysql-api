import { IsNotEmpty, IsBoolean, IsEmail } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: number;

  thumbnail: string;

  author: string[];
}
