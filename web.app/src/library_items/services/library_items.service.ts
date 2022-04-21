import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class LibraryItemsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}

  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsRepository.findAll();
  }
}
