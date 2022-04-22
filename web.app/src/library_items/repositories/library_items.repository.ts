import { Injectable } from '@nestjs/common';
import { LibraryItem, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LibraryItemsRepository {
  constructor(private prisma: PrismaService) {}

  async createItem(
    item: Prisma.LibraryItemCreateInput,
  ): Promise<[LibraryItem?, Error?]> {
    try {
      const createdItem = await this.prisma.libraryItem.create({
        data: {
          ...item,
        },
      });
      return [createdItem, undefined];
    } catch (e: any) {
      return [undefined, e];
    }
  }

  async findAll(): Promise<LibraryItem[]> {
    const items = await this.prisma.libraryItem.findMany();
    return items;
  }

  async updateItem(
    id: number,
    type: string,
    item: Prisma.LibraryItemUpdateInput,
  ): Promise<[number, Error?]> {
    try {
      const numUpdated = await this.prisma.libraryItem.updateMany({
        where: {
          AND: [
            {
              id,
            },
            {
              type: type,
            },
            ,
          ],
        },
        data: {
          ...item,
        },
      });
      return [numUpdated.count, undefined];
    } catch (e: any) {
      return [undefined, e];
    }
  }

  async deleteItem(id: number): Promise<[LibraryItem, Error?]> {
    try {
      const deleteItem = await this.prisma.libraryItem.delete({
        where: {
          id,
        },
      });
      return [deleteItem, undefined];
    } catch (e: any) {
      return [undefined, e];
    }
  }

  async findOne(id: number): Promise<LibraryItem | undefined> {
    try {
      const item = await this.prisma.libraryItem.findUnique({
        where: {
          id,
        },
      });
      return item;
    } catch (e: any) {
      return undefined;
    }
  }

  async checkOutItem(
    id: number,
    borrower: string,
  ): Promise<[LibraryItem?, Error?]> {
    try {
      const updatedItem = await this.prisma.libraryItem.update({
        where: {
          id,
        },
        data: {
          borrower,
          isBorrowable: false,
        },
      });
      return [updatedItem, undefined];
    } catch (e: any) {
      return [undefined, e];
    }
  }

  async checkInItem(id: number): Promise<[LibraryItem?, Error?]> {
    try {
      const updatedItem = await this.prisma.libraryItem.update({
        where: {
          id,
        },
        data: {
          borrower: null,
          isBorrowable: true,
        },
      });
      return [updatedItem, undefined];
    } catch (e: any) {
      return [undefined, e];
    }
  }
}
