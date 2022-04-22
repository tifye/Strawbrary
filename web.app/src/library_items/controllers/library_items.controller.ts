import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { ParseItemPipe } from '../pipes/item_exists.pipe';
import { LibraryItemsService } from '../services/library_items.service';

@Controller('items')
export class LibraryItemsController {
  constructor(private libraryItemsService: LibraryItemsService) {}

  @Get()
  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.libraryItemsService.delete(id);

    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    return true;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, ParseItemPipe) item: LibraryItem,
  ): Promise<LibraryItem> {
    return item;
  }
}
