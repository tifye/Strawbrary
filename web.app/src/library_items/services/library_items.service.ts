import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { CreateLibraryItemDto } from './dto/create-library_item.dto';

@Injectable()
export class LibraryItemsService {
  private readonly libraryItems: LibraryItem[] = [];

  create(libraryItem: CreateLibraryItemDto) {
    this.libraryItems.push({
      ...libraryItem,
      id: this.libraryItems.length,
    });
  }

  findOne(id: number): LibraryItem {
    return this.libraryItems[id];
  }

  findAll(): LibraryItem[] {
    return this.libraryItems;
  }
}
