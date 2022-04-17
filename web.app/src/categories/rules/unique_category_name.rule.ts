import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../../prisma.service';

@ValidatorConstraint({ name: 'UniqueCategoryNameRule', async: true })
@Injectable()
export class UniqueCategoryNameRule implements ValidatorConstraintInterface {
  constructor(private primsa: PrismaService) {}

  async validate(categoryName: string): Promise<boolean> {
    const category = await this.primsa.category.findFirst({
      where: {
        categoryName,
      },
    });
    if (category) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'Category name already exists';
  }
}
