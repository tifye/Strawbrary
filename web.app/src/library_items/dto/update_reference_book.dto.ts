import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, Validate } from 'class-validator';
import { ValidItemTypeRule } from '../rules/valid_item_type.rule';
import { CreateReferenceBookDto } from './create_reference_book.dto';

export class UpdateReferenceBookDto extends PartialType(
  CreateReferenceBookDto,
) {
  @IsString()
  @IsOptional()
  @Validate(ValidItemTypeRule)
  type?: string;
}
