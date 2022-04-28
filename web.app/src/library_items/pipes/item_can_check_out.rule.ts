import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemType } from '../enums/library_item_type.enum';

@Injectable()
export class ItemCanCheckOutRule implements PipeTransform<LibraryItem> {
  async transform(item: LibraryItem): Promise<LibraryItem> {
    if (this.nonCheckableItemType(item) || !item.isBorrowable) {
      throw new BadRequestException(['Item cannot be checked out.']);
    }
    return item;
  }

  nonCheckableItemType(item: LibraryItem): boolean {
    return item.type === LibraryItemType.ReferenceBook;
  }
}
