import { Test, TestingModule } from '@nestjs/testing';
import {
  mock_categories,
  mock_category,
  mock_categoryDto,
} from '../__mock-data__/categories.mock';
import { PrismaService } from '../prisma.service';
import { CategoriesRepository } from './categories.repository';

describe('CategoriesRepository', () => {
  let repository: CategoriesRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesRepository,
        {
          provide: PrismaService,
          useFactory: () => ({
            category: {
              create: jest.fn().mockReturnValue(mock_category),
              findUnique: jest.fn().mockReturnValue(mock_categories[0]),
            },
          }),
        },
      ],
    }).compile();

    repository = module.get<CategoriesRepository>(CategoriesRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('Create new category', () => {
    it('Should create a new category', async () => {
      // Given
      const newCategoryDto = mock_categoryDto;

      // When
      const result = await repository.createCategory(newCategoryDto);

      // Then
      expect(result[0]).toEqual(mock_category);
      expect(result[1]).toBeUndefined();
    });

    it('Should return categoryName not unique error', async () => {
      // Given
      const newCategoryDto = mock_categoryDto;
      const createSpy = jest
        .spyOn(prisma.category, 'create')
        .mockRejectedValueOnce(new Error('Category name not unique'));

      // When
      const result = await repository.createCategory(newCategoryDto);

      // Then
      expect(result[0]).toBeUndefined();
      expect(result[1]).toEqual(Error('Category name not unique'));
      expect(createSpy).toHaveBeenCalledWith({
        data: newCategoryDto,
      });
    });
  });

  describe('Find', () => {
    it('Should find a category by name', async () => {
      // Given
      const categoryName = mock_categories[0].categoryName;

      // When
      const result = await repository.findByName(categoryName);

      // Then
      expect(result[0]).toEqual(mock_categories[0]);
    });

    it('Should find a category by id', async () => {
      // Given
      const id = mock_categories[0].id;

      // When
      const result = await repository.findOne(id);

      // Then
      expect(result[0]).toEqual(mock_categories[0]);
    });
  });
});
