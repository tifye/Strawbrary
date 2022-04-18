import { Category } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<[Category?, string?]> {
    const result = await this.categoriesRepository.createCategory(
      createCategoryDto,
    );

    if (result[1]) {
      return [undefined, result[1].message];
    }

    return [result[0], undefined];
  }

  async findAll() {
    return await this.categoriesRepository.findAll();
  }

  async findOne(id: number): Promise<[Category?, string?]> {
    const result = await this.categoriesRepository.findOne(id);
    if (result[1]) {
      return [undefined, result[1].message];
    }
    return [result[0], undefined];
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<[Category?, string?]> {
    const result = await this.categoriesRepository.update(
      id,
      updateCategoryDto,
    );

    if (result[1]) {
      return [undefined, result[1].message];
    }

    return [result[0], undefined];
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
