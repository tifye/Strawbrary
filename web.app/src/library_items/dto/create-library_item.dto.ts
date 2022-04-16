import { IsString } from 'class-validator';

export class CreateLibraryItemDto {
  @IsString()
  title: string;

  @IsString()
  author: string;
}
