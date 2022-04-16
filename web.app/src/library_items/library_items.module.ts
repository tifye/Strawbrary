import { Module } from '@nestjs/common';
import { LibraryItemsController } from './library_items.controller';

@Module({
  imports: [],
  controllers: [LibraryItemsController],
  providers: [],
})
export class LibraryItemsModule {}
