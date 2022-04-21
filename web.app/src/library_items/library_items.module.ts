import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { LibraryItemsController } from './controllers/library_items.controller';
import { LibraryItemsService } from './services/library_items.service';
import { BooksService } from './services/books.service';
import { LibraryItemsRepository } from './repositories/library_items.repository';
import { PrismaService } from 'src/prisma.service';
import { DvdsController } from './controllers/dvds.controller';
import { DvdsService } from './services/dvds.service';
import { AudioBookService } from './services/audio_book.service';
import { AudioBookController } from './controllers/audio_book.controller';
import { ReferenceBooksController } from './controllers/reference_books.controller';
import { ReferenceBooksService } from './services/reference_book.service';

@Module({
  imports: [],
  controllers: [
    LibraryItemsController,
    AudioBookController,
    BooksController,
    DvdsController,
    ReferenceBooksController,
  ],
  providers: [
    LibraryItemsService,
    BooksService,
    DvdsService,
    AudioBookService,
    ReferenceBooksService,
    LibraryItemsRepository,
    PrismaService,
  ],
})
export class LibraryItemsModule {}
