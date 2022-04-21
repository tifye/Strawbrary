import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
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
  @Expose()
  @IsBoolean()
  @IsOptional()
  isBorrowable?: boolean;

  @Expose()
  @IsDate()
  @IsOptional()
  borrowDate?: Date;

  @Expose()
  @IsString()
  @IsOptional()
  borrower?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Validate(ValidItemTypeRule)
  type?: string;
}
