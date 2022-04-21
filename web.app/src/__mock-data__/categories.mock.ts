import { Category } from '@prisma/client';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export const mock_categoryDto: CreateCategoryDto = {
  categoryName: 'Porn',
};

export const mock_category: Category = {
  id: 1,
  categoryName: 'Fiction',
};

export const mock_categories: Category[] = [
  {
    id: 1,
    categoryName: 'Hentai',
  },
  {
    id: 2,
    categoryName: 'Manga',
  },
];
