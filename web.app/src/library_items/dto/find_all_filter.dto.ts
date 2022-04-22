import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min, Validate } from 'class-validator';
import { OrderDirectionRule } from '../../.rules/order_direction.rule';
import { LibraryItemsOrderByRule } from '../rules/library_items_order_by.rule';

export class FindAllFilterDto {
  @Expose()
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @IsOptional()
  perPage?: number;

  @Expose()
  @IsString()
  @IsOptional()
  search?: string;

  @Expose()
  @IsString()
  @Validate(LibraryItemsOrderByRule)
  @IsOptional()
  orderBy?: string;

  @Expose()
  @IsString()
  @Validate(OrderDirectionRule)
  @IsOptional()
  orderDirection?: string;
}
