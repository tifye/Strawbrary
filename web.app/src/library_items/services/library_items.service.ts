import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class LibraryItemsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}

  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsRepository.findAll();
  }

  async delete(id: number): Promise<[boolean, string?]> {
    const result = await this.libraryItemsRepository.deleteItem(id);

    if (result[1]) {
      return [false, result[1].message];
    }

    return [true, undefined];
  }

  async checkOut(
    item: LibraryItem,
    borrower: string,
  ): Promise<[LibraryItem?, string?]> {
    if (item.isBorrowable === false)
      return [undefined, 'This item cannot currently be checked out'];

    const result = await this.libraryItemsRepository.checkOutItem(
      item.id,
      borrower,
    );

    if (result[1]) {
      return [undefined, 'Could not check out item'];
    }

    return [result[0], undefined];
  }

  async checkIn(item: LibraryItem): Promise<[LibraryItem?, string?]> {
    if (item.isBorrowable === true) {
      return [undefined, 'Item already checked in'];
    }

    const result = await this.libraryItemsRepository.checkInItem(item.id);

    if (result[1]) {
      return [undefined, 'Could not check in item'];
    }

    return [result[0], undefined];
  }

  async changeItemType(
    item: LibraryItem,
    targetType: LibraryItemType,
  ): Promise<[LibraryItem?, string?]> {
    const updateData: any = {
      type: targetType,
    };

    if (
      item.type === LibraryItemType.ReferenceBook &&
      targetType !== LibraryItemType.ReferenceBook
    ) {
      updateData.isBorrowable = true;
    } else if (
      item.type !== LibraryItemType.ReferenceBook &&
      targetType === LibraryItemType.ReferenceBook
    ) {
      updateData.isBorrowable = false;
    }

    const result = await this.libraryItemsRepository.updateItem(
      item.id,
      item.type,
      updateData,
    );

    if (result[1]) {
      return [undefined, 'Could not change item type'];
    }

    const updatedItem = await this.libraryItemsRepository.findOne(item.id);
    return [updatedItem, undefined];
  }
}
