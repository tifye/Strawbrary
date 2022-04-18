import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { CreateBookDto } from './create_book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsBoolean()
  isBorrowable?: boolean;

  @IsDate()
  borrowDate?: Date;

  @IsString()
  borrower?: string;
}
