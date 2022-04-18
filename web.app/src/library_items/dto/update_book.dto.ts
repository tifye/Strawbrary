import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { CreateBookDto } from './create_book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsBoolean()
  @IsOptional()
  isBorrowable?: boolean;

  @IsDate()
  @IsOptional()
  borrowDate?: Date;

  @IsString()
  @IsOptional()
  borrower?: string;
}
