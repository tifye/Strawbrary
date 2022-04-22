import { IsNumber, Min } from 'class-validator';

export class PaginationDataDto {
  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Min(1)
  limit: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsNumber()
  @Min(1)
  lastPage: number;
}
