import { Expose } from 'class-transformer';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateAudioBookDto {
  @Expose()
  @IsString()
  @Length(4, 255)
  title: string;

  @Expose()
  @IsNumber()
  @Min(4)
  runTimeMinutes: number;

  @Expose()
  @IsNumber()
  @Min(0)
  categoryId: number;
}
