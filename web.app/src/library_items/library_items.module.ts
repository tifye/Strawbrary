import { Module } from '@nestjs/common';
import { LibraryItemsController } from './library_items.controller';
import { LibraryItemsService } from './library_items.service';

@Module({
  imports: [],
  controllers: [LibraryItemsController],
  providers: [LibraryItemsService],
})
export class LibraryItemsModule {}
