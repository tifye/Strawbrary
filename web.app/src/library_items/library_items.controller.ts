import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateLibraryItemDto } from './dto/create-library_item.dto';
import { LibraryItem } from './interfaces/library_item.interface';
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

  @Post()
  async create(@Body() createLibraryItemDto: CreateLibraryItemDto) {
    this.libraryItemsService.create(createLibraryItemDto);
  }
}
