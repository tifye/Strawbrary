import { Controller, Get, Param } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemsService } from './library_items.service';

@Controller('items')
export class LibraryItemsController {
  constructor(private libraryItemsService: LibraryItemsService) {}

  @Get()
  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LibraryItem> {
    return this.libraryItemsService.findOne(Number(id));
  }
}
