import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(4, 255)
  categoryName: string;
}
