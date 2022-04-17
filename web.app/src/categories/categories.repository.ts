import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { NotFoundError } from 'rxjs';
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

  async findByName(name: string): Promise<[Category?, Error?]> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          categoryName: name,
        },
      });
      return [category, undefined];
    } catch (e: any) {
      if (e instanceof NotFoundError) return [undefined, undefined];
      else return [undefined, e];
    }
  }
}
