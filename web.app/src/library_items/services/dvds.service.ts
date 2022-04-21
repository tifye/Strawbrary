import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { CreateDvdDto } from '../dto/create_dvd.dto';
import { UpdateDvdDto } from '../dto/update_dvd.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class DvdsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}
  async create(dvd: CreateDvdDto): Promise<[LibraryItem?, string?]> {
    const { categoryId } = dvd;
    delete dvd.categoryId;
    const dvdData = JSON.parse(JSON.stringify(dvd));
    const result = await this.libraryItemsRepository.createItem({
      ...dvdData,
      type: LibraryItemType.Dvd,
      isBorrowable: true,
      category: {
        connect: {
          id: categoryId,
        },
      },
    });

    if (result[1]) {
      return [undefined, result[1].message];
    }

    return [result[0], undefined];
  }

  async update(id: number, dvd: UpdateDvdDto): Promise<[number?, string?]> {
    const result = await this.libraryItemsRepository.updateItem(
      id,
      LibraryItemType.Dvd,
      dvd,
    );

    if (result[1]) {
      return [undefined, 'Database Error'];
    }

    return [result[0], undefined];
  }
}
