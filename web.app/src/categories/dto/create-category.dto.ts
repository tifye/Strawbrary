import { Expose } from 'class-transformer';
import { IsString, Length, Validate } from 'class-validator';
import { UniqueCategoryNameRule } from '../rules/unique_category_name.rule';

export class CreateCategoryDto {
  @Expose()
  @IsString()
  @Length(4, 255)
  @Validate(UniqueCategoryNameRule)
  categoryName: string;
}
