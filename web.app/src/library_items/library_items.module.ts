import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { LibraryItemsController } from './controllers/library_items.controller';
import { LibraryItemsService } from './services/library_items.service';
import { BooksService } from './services/books.service';
import { LibraryItemsRepository } from './repositories/library_items.repository';
import { PrismaService } from 'src/prisma.service';
import { DvdsController } from './controllers/dvds.controller';
import { DvdsService } from './services/dvds.service';

@Module({
  imports: [],
  controllers: [LibraryItemsController, BooksController, DvdsController],
  providers: [
    LibraryItemsService,
    BooksService,
    DvdsService,
    LibraryItemsRepository,
    PrismaService,
  ],
})
export class LibraryItemsModule {}
