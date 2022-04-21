import { Expose } from 'class-transformer';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateReferenceBookDto {
  @Expose()
  @IsString()
  @Length(4, 255)
  title: string;

  @Expose()
  @IsString()
  @Length(4, 255)
  author: string;

  @Expose()
  @IsNumber()
  @Min(0)
  pages: number;

  @Expose()
  @IsNumber()
  @Min(0)
  categoryId: number;
}
