import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class ParseItemPipe implements PipeTransform<number> {
  constructor(private readonly repository: LibraryItemsRepository) {}

  async transform(id: number): Promise<LibraryItem> {
    const item = await this.repository.findOne(Number(id));
    if (!item) {
      throw new BadRequestException(['Item does not exist.']);
    }

    return item;
  }
}
