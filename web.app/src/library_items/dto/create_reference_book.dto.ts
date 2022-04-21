import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateReferenceBookDto {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsString()
  @Length(4, 255)
  author: string;

  @IsNumber()
  @Min(0)
  pages: number;

  @IsNumber()
  @Min(0)
  categoryId: number;
}
