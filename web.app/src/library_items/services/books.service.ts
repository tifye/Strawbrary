import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create_book.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class BooksService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}
  create(book: CreateBookDto) {
    const { categoryId } = book;
    delete book.categoryId;
    return this.libraryItemsRepository.createItem({
      ...book,
      type: LibraryItemType.Book,
      isBorrowable: true,
      category: {
        connect: {
          id: categoryId,
        },
      },
    });
  }
}
