import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesRepository } from '../categories.repository';

@ValidatorConstraint({ name: 'UniqueCategoryNameRule', async: true })
@Injectable()
export class UniqueCategoryNameRule implements ValidatorConstraintInterface {
  constructor(private categoryRepository: CategoriesRepository) {}

  async validate(categoryName: string): Promise<boolean> {
    const result = await this.categoryRepository.findByName(categoryName);
    if (result[0]) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'Category name already exists';
  }
}
