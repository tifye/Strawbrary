import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create_book.dto';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class BooksService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}

  create(book: CreateBookDto) {
    console.log(book);
  }
}
