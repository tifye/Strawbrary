import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CheckInItemDto {
  @Expose()
  @IsString()
  @Length(4, 255)
  borrower: string;
}
