import { Injectable } from '@nestjs/common';
import { LibraryItem, Prisma } from '@prisma/client';
import { PaginationDataDto } from '../dto/pagination_data.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class LibraryItemsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}

  async findAll(params: {
    page?: number;
    perPage?: number;
    matching?: Exclude<Partial<LibraryItem>, 'title' | 'author' | 'type'>;
    search?: string;
    orderByData?: 'type' | 'categoryName' | 'relevance';
    orderByDirection?: 'asc' | 'desc';
  }): Promise<[PaginationDataDto, LibraryItem[]]> {
    // What kind of abomination have i created T-T
    const { page, perPage, matching, orderByData, orderByDirection, search } =
      params;

    const searchText = (search || '').trim().split(' ').join(' | ');

    const orderBy: Prisma.LibraryItemOrderByWithRelationAndSearchRelevanceInput =
      {
        ...(orderByData === 'relevance' && {
          _relevance: {
            fields: ['title', 'author', 'type'],
            search: searchText,
            sort: orderByDirection ? orderByDirection : 'asc',
          },
        }),
        ...(orderByData === 'type' && {
          type: orderByDirection ? orderByDirection : 'asc',
        }),
        ...(orderByData === 'categoryName' && {
          category: { categoryName: orderByDirection },
        }),
        ...(!orderByData && {
          title: orderByDirection ? orderByDirection : 'desc',
        }),
      };

    const where: Prisma.LibraryItemWhereInput = {
      ...(matching && { ...matching }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            type: {
              contains: search,
            },
          },
          {
            author: {
              contains: search,
            },
          },
        ],
      }),
    };
    let skip = 0;
    if (page && perPage) {
      skip = (page - 1) * perPage;
    }
    const result = await this.libraryItemsRepository.findAll({
      where,
      orderBy,
      take: perPage,
      skip,
    });

    const total = await this.libraryItemsRepository.count(where);
    const paginationData: PaginationDataDto = {
      page: page ? page : 1,
      limit: perPage ? perPage : total,
      total,
      lastPage: Math.ceil(total / (perPage ? perPage : total)),
    };

    return [paginationData, result];
  }

  async delete(id: number): Promise<[boolean, string?]> {
    const result = await this.libraryItemsRepository.deleteItem(id);

    if (result[1]) {
      return [false, result[1].message];
    }

    return [true, undefined];
  }

  async checkOut(
    item: LibraryItem,
    borrower: string,
  ): Promise<[LibraryItem?, string?]> {
    if (item.isBorrowable === false)
      return [undefined, 'This item cannot currently be checked out'];

    const result = await this.libraryItemsRepository.checkOutItem(
      item.id,
      borrower,
    );

    if (result[1]) {
      return [undefined, 'Could not check out item'];
    }

    return [result[0], undefined];
  }

  async checkIn(item: LibraryItem): Promise<[LibraryItem?, string?]> {
    if (item.isBorrowable === true) {
      return [undefined, 'Item already checked in'];
    }

    const result = await this.libraryItemsRepository.checkInItem(item.id);

    if (result[1]) {
      return [undefined, 'Could not check in item'];
    }

    return [result[0], undefined];
  }

  async changeItemType(
    item: LibraryItem,
    targetType: LibraryItemType,
  ): Promise<[LibraryItem?, string?]> {
    const updateData: any = {
      type: targetType,
    };

    if (
      item.type === LibraryItemType.ReferenceBook &&
      targetType !== LibraryItemType.ReferenceBook
    ) {
      updateData.isBorrowable = true;
    } else if (
      item.type !== LibraryItemType.ReferenceBook &&
      targetType === LibraryItemType.ReferenceBook
    ) {
      if (!item.isBorrowable)
        throw new Error(
          'Attempting to changed a borrowed item to an un-borrowable type',
        );
      updateData.isBorrowable = false;
    }

    const result = await this.libraryItemsRepository.updateItem(
      item.id,
      item.type,
      updateData,
    );

    if (result[1]) {
      return [undefined, 'Could not change item type'];
    }

    const updatedItem = await this.libraryItemsRepository.findOne(item.id);
    return [updatedItem, undefined];
  }
}
