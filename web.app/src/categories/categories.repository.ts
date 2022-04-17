import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    categoryDto: Prisma.CategoryCreateInput,
  ): Promise<[Category?, Error?]> {
    try {
      const createdCategory = await this.prisma.category.create({
        data: {
          ...categoryDto,
        },
      });
      return [createdCategory, undefined];
    } catch (e: any) {
      return [undefined, e];
    }
  }
}
