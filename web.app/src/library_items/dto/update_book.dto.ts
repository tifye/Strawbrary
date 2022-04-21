import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ValidItemTypeRule } from '../rules/valid_item_type.rule';
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

  @IsString()
  @IsOptional()
  @Validate(ValidItemTypeRule)
  type?: string;
}
