import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookDto } from '../dto/create_book.dto';
import { BooksService } from '../services/books.service';
import { mock_book, mock_bookDto } from '../__mock-data__/library_items.mock';
import { BooksController } from './books.controller';

const mockService = {
  create: jest.fn().mockImplementation((item: CreateBookDto) => {
    return {
      ...item,
      ...mock_book,
    };
  }),
};

describe('BooksController Unit Tests', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: BooksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create new Book', () => {
    it('Should create a new book', async () => {
      // Given
      const newBookDto = mock_bookDto;

      // When
      const result = await controller.create(newBookDto);

      // Then
      expect(result).toEqual(mock_book);
      expect(service.create).toHaveBeenCalledWith(newBookDto);
    });
  });
});
