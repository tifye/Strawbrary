import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsString()
  @Length(4, 255)
  author: string;

  @IsNumber()
  pages: number;

  @IsNumber()
  @Min(0)
  categoryId: number;
}
