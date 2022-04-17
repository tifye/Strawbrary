import { Category } from '@prisma/client';

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
