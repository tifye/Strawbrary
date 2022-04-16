import { Injectable } from '@nestjs/common';
import { LibraryItem, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LibraryItemsRepository {
  constructor(private prisma: PrismaService) {}

  async createItem(item: Prisma.LibraryItemCreateInput): Promise<LibraryItem> {
    const createdItem = await this.prisma.libraryItem.create({
      data: {
        ...item,
      },
    });
    return createdItem;
  }

  async findAll(): Promise<LibraryItem[]> {
    const items = await this.prisma.libraryItem.findMany();
    return items;
  }
}
