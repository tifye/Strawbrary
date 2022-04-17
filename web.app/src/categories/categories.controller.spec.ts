import { Test, TestingModule } from '@nestjs/testing';
import {
  mock_category,
  mock_categoryDto,
} from '../__mock-data__/categories.mock';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const mockService = {
  create: jest.fn().mockImplementation((category: CreateCategoryDto) => {
    return {
      ...category,
      ...mock_category,
    };
  }),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('Should create and return a new category', async () => {
    // Given
    const newCategoryDto = mock_categoryDto;

    // When
    const result = await controller.create(newCategoryDto);

    // Then
    expect(result).toEqual(mock_category);
  });
});
