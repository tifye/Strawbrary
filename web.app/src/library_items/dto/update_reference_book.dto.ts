import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsString, IsOptional, Validate } from 'class-validator';
import { ValidItemTypeRule } from '../rules/valid_item_type.rule';
import { CreateReferenceBookDto } from './create_reference_book.dto';

export class UpdateReferenceBookDto extends PartialType(
  CreateReferenceBookDto,
) {
  @Expose()
  @IsString()
  @IsOptional()
  @Validate(ValidItemTypeRule)
  type?: string;
}
