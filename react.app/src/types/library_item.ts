import { plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Length, Min, ValidateIf } from 'class-validator';
import { CategoriesStore } from '../remote_access';
import { Category } from './';

const validationGroups = {
  'author': ['Book', 'ReferenceBook'],
  'pages': ['Book', 'ReferenceBook'],
  'runTimeMinutes': ['Dvd', 'AudioBook'],
};

export class LibraryItem {
  constructor(private categoriesStore: CategoriesStore = new CategoriesStore()) {}

  private static toValidate(field: string, type: string) {
    return (validationGroups as any)[field].includes(type);
  }

  @IsNumber()
  @Min(0)
  id: number;

  @IsString()
  @Length(4, 255)
  title: string;

  @ValidateIf(o => LibraryItem.toValidate('author', o.type))  
  @IsString()
  @Length(4, 255)
  @IsOptional()
  author?: string | null;

  @ValidateIf(o => LibraryItem.toValidate('pages', o.type)) 
  @IsNumber()
  @Min(1)
  @IsOptional()
  pages?: number | null;

  @ValidateIf(o => LibraryItem.toValidate('runTimeMinutes', o.type)) 
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

  public get titleWithAcronym(): string {
    const words = this.title.split(' ');
    const acronym = words.map(word => word[0]).join('');
    return `${this.title} (${acronym})`;
  }
}