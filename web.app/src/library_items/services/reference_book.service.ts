import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { CreateReferenceBookDto } from '../dto/create_reference_book.dto';
import { UpdateReferenceBookDto } from '../dto/update_reference_book.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class ReferenceBooksService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}
  async create(
    referenceBook: CreateReferenceBookDto,
  ): Promise<[LibraryItem?, string?]> {
    const { categoryId } = referenceBook;
    const referenceBookData = JSON.parse(JSON.stringify(referenceBook));
    delete referenceBookData.categoryId;
    const result = await this.libraryItemsRepository.createItem({
      ...referenceBookData,
      type: LibraryItemType.ReferenceBook,
      isBorrowable: false,
      category: {
        connect: {
          id: categoryId,
        },
      },
    });

    if (result[1]) {
      return [undefined, result[1].message];
    }

    return [result[0], undefined];
  }

  async update(
    id: number,
    referenceBook: UpdateReferenceBookDto,
  ): Promise<[number?, string?]> {
    const result = await this.libraryItemsRepository.updateItem(
      id,
      LibraryItemType.ReferenceBook,
      referenceBook,
    );

    if (result[1]) {
      return [undefined, 'Database Error'];
    }

    return [result[0], undefined];
  }
}
