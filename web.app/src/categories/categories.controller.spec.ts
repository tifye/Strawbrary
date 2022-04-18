import { Test, TestingModule } from '@nestjs/testing';
import {
  mock_category,
  mock_categoryDto,
} from '../__mock-data__/categories.mock';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const mockService = {
  create: jest.fn().mockImplementation((category: CreateCategoryDto) => {
    return [
      {
        ...category,
        ...mock_category,
      },
      undefined,
    ];
  }),
  findOne: jest.fn().mockResolvedValue([mock_category, undefined]),
  remove: jest.fn().mockResolvedValue([false, undefined]),
};

const mockRepository = {};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useValue: mockService,
        },
        {
          provide: CategoriesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Should create and return a new category', async () => {
      // Given
      const newCategoryDto = mock_categoryDto;

      // When
      const result = await controller.create(newCategoryDto);

      // Then
      expect(result).toEqual(mock_category);
    });
  });

  describe('Find', () => {
    it('Should return a category', async () => {
      // Given
      const id = mock_category.id;

      // When
      const result = await controller.findOne(id);

      // Then
      expect(result).toEqual(mock_category);
    });
  });
});
