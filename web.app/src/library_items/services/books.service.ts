import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create_book.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class BooksService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}
  async create(book: CreateBookDto) {
    const { categoryId } = book;
    delete book.categoryId;
    const bookData = JSON.parse(JSON.stringify(book));
    const result = await this.libraryItemsRepository.createItem({
      ...bookData,
      type: LibraryItemType.Book,
      isBorrowable: true,
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
}
