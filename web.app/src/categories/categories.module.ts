import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { UniqueCategoryNameRule } from './rules/unique_category_name.rule';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, UniqueCategoryNameRule],
})
export class CategoriesModule {}
