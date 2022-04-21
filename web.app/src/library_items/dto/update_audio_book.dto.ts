import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsString, IsOptional, Validate } from 'class-validator';
import { ValidItemTypeRule } from '../rules/valid_item_type.rule';
import { CreateAudioBookDto } from './create_audio_book.dto';

export class UpdateAudioBookDto extends PartialType(CreateAudioBookDto) {
  @Expose()
  @IsString()
  @IsOptional()
  @Validate(ValidItemTypeRule)
  type?: string;
}
