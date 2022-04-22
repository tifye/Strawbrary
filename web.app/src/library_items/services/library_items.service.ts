import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class LibraryItemsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}

  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsRepository.findAll();
  }

  async delete(id: number): Promise<[boolean, string?]> {
    const result = await this.libraryItemsRepository.deleteItem(id);

    if (result[1]) {
      return [false, result[1].message];
    }

    return [true, undefined];
  }
}
