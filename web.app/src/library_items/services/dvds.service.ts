import { Injectable } from '@nestjs/common';
import { CreateDvdDto } from '../dto/create_dvd.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class DvdsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}
  create(dvd: CreateDvdDto) {
    const { categoryId } = dvd;
    delete dvd.categoryId;
    const dvdData = JSON.parse(JSON.stringify(dvd));
    return this.libraryItemsRepository.createItem({
      ...dvdData,
      type: LibraryItemType.Dvd,
      isBorrowable: true,
      category: {
        connect: {
          id: categoryId,
        },
      },
    });
  }
}
