import { Module } from '@nestjs/common';
import { BooksController } from './controllers/book.controller';
import { LibraryItemsController } from './controllers/library_items.controller';
import { LibraryItemsService } from './services/library_items.service';
import { BooksService } from './services/books.service';
import { LibraryItemsRepository } from './repositories/library_items.repository';

@Module({
  imports: [],
  controllers: [LibraryItemsController, BooksController],
  providers: [LibraryItemsService, BooksService, LibraryItemsRepository],
})
export class LibraryItemsModule {}
