import { TestingModule, Test } from '@nestjs/testing';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';
import {
  mock_book,
  mock_bookDto,
  mock_libraryItems,
} from '../../__mock-data__/library_items.mock';
import { BooksService } from './books.service';

const mockRepository = {
  createItem: jest.fn().mockResolvedValue([mock_book, undefined]),
  findAll: jest.fn().mockResolvedValue(mock_libraryItems),
};

describe('BooksService', () => {
  let service: BooksService;
  let repository: LibraryItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: LibraryItemsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<LibraryItemsRepository>(LibraryItemsRepository);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Book', () => {
    it('Should create a new book', async () => {
      // Given
      const newBookDto = JSON.parse(JSON.stringify(mock_bookDto));

      // When
      const result = await service.create(newBookDto);

      // Then
      expect(result[0]).toEqual(mock_book);
      const { categoryId, ...rest } = mock_bookDto;
      const calledWith = {
        ...rest,
        type: LibraryItemType.Book,
        isBorrowable: true,
        category: {
          connect: {
            id: categoryId,
          },
        },
      };
      expect(repository.createItem).toHaveBeenCalledWith(
        expect.objectContaining(calledWith),
      );
    });
  });
});
