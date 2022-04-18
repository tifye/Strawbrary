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

@Module({
  imports: [],
  controllers: [
    LibraryItemsController,
    AudioBookController,
    BooksController,
    DvdsController,
  ],
  providers: [
    LibraryItemsService,
    BooksService,
    DvdsService,
    AudioBookService,
    LibraryItemsRepository,
    PrismaService,
  ],
})
export class LibraryItemsModule {}
