import { IsNumber, IsString, Length, Min } from 'class-validator';

export class Category {
  @IsNumber()
  @Min(0)
  id: number;

  @IsString()
  @Length(4, 255)
  categoryName: string;
} 