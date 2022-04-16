import { Injectable } from '@nestjs/common';
import { CreateLibraryItemDto } from './dto/create-library_item.dto';
import { LibraryItem } from './interfaces/library_item.interface';

@Injectable()
export class LibraryItemsService {
  private readonly libraryItems: LibraryItem[] = [];

  create(libraryItem: CreateLibraryItemDto) {
    this.libraryItems.push({
      ...libraryItem,
      id: this.libraryItems.length + 1,
    });
  }

  findOne(id: number): LibraryItem {
    return this.libraryItems[id];
  }

  findAll(): LibraryItem[] {
    return this.libraryItems;
  }
}
