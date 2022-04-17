import { IsString, Length, Validate } from 'class-validator';
import { UniqueCategoryNameRule } from '../rules/unique_category_name.rule';

export class CreateCategoryDto {
  @IsString()
  @Length(4, 255)
  @Validate(UniqueCategoryNameRule)
  categoryName: string;
}
