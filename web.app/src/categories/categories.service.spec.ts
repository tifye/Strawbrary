import { Test, TestingModule } from '@nestjs/testing';
import { mock_category } from '../__mock-data__/categories.mock';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const mockRepository = {
  createCategory: jest
    .fn()
    .mockImplementation((category: CreateCategoryDto) => {
      return Promise.resolve([
        {
          ...mock_category,
          ...category,
        },
        undefined,
      ]);
    }),
};

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a new category', async () => {
      // Given
      const newCategoryDto = mock_category;

      // When
      const result = await service.create(newCategoryDto);

      // Then
      expect(result).toEqual([mock_category, undefined]);
    });

    it('Should return that the category name is not unique', async () => {
      // Given
      const newCategoryDto = mock_category;
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce([undefined, 'Category name not unique']);

      // When
      const result = await service.create(newCategoryDto);

      // Then
      expect(result[1]).toEqual('Category name not unique');
      expect(createSpy).toHaveBeenCalledWith(newCategoryDto);
    });
  });
});
