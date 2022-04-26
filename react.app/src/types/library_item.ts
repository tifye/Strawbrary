import { plainToClass } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { CategoriesStore } from '../remote_access';
import { Category } from './category';
export class LibraryItem {
  constructor(private categoriesStore: CategoriesStore = new CategoriesStore()) {}

  @IsNumber()
  @Min(0)
  id: number;

  @IsString()
  @Length(4, 255)
  title: string;

  @IsString()
  @Length(4, 255)
  @IsOptional()
  author?: string | null;

  @IsNumber()
  @Min(1)
  @IsOptional()
  pages?: number | null;

  @IsNumber()
  @Min(0)
  @IsOptional()
  runTimeMinutes?: number | null;

  @IsBoolean()
  isBorrowable: boolean;

  @IsString()
  @Length(4, 255)
  @IsOptional()
  borrower?: string | null;

  @IsDate()
  @IsOptional()
  borrowDate?: Date | null;

  @IsString()
  type: string;

  @IsNumber()
  @Min(0)
  categoryId: number;

  category?: Category;

  public setCategory(category: Category): void {
    this.category = category;
  }

  public async getCategoryAsync(): Promise<Category> {
  return plainToClass(Category, await this.categoriesStore.getCategory(this.categoryId));
  }

  public async attachCategory(): Promise<void> {
    this.category = await this.getCategoryAsync();
  }
}