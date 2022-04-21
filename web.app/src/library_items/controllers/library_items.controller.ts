import { Controller, Get } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemsService } from '../services/library_items.service';

@Controller('items')
export class LibraryItemsController {
  constructor(private libraryItemsService: LibraryItemsService) {}

  @Get()
  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsService.findAll();
  }
}
