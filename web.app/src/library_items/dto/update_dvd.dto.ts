import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsString, IsOptional, Validate } from 'class-validator';
import { ValidItemTypeRule } from '../rules/valid_item_type.rule';
import { CreateDvdDto } from './create_dvd.dto';

export class UpdateDvdDto extends PartialType(CreateDvdDto) {
  @Expose()
  @IsString()
  @IsOptional()
  @Validate(ValidItemTypeRule)
  type?: string;
}
