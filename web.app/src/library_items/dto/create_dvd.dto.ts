import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateDvdDto {
  @IsString()
  @Length(4, 255)
  title: string;

  @IsNumber()
  @Min(4)
  runTimeMinutes: number;

  @IsNumber()
  @Min(0)
  categoryId: number;
}
