import { IsBoolean, IsNumber, IsString, Length, Min } from 'class-validator';
import { LibraryItemType } from '../enums/library_item_type.enum';

export class CreateBookDto {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsString()
  @Length(4, 255)
  author: string;

  @IsNumber()
  pages: number;

  @IsString()
  type: LibraryItemType;

  @IsNumber()
  @Min(0)
  categoryId: number;

  @IsBoolean()
  isBorrowable: boolean;
}
