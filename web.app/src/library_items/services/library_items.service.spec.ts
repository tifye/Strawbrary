import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { LibraryItemsRepository } from '../repositories/library_items.repository';
import {
  mock_book,
  mock_libraryItems,
} from '../../__mock-data__/library_items.mock';
import { LibraryItemsService } from './library_items.service';

const mockRepository = {
  createItem: jest
    .fn()
    .mockImplementation((item: Prisma.LibraryItemCreateInput) =>
      Promise.resolve({ id: 1, ...item }),
    ),
  findAll: jest.fn().mockResolvedValue(mock_libraryItems),
  deleteItem: jest.fn().mockResolvedValue([mock_book, undefined]),
  checkOutItem: jest.fn().mockResolvedValue([mock_book, undefined]),
  count: jest.fn().mockResolvedValue(mock_libraryItems.length),
};

describe('LibraryItemsService', () => {
  let service: LibraryItemsService;
  let repository: LibraryItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryItemsService,
        {
          provide: LibraryItemsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LibraryItemsService>(LibraryItemsService);
    repository = module.get<LibraryItemsRepository>(LibraryItemsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get Items', () => {
    it('Should get an array of library items', async () => {
      await expect(service.findAll({})).resolves.toEqual([
        {
          page: 1,
          limit: mock_libraryItems.length,
          total: mock_libraryItems.length,
          lastPage: 1,
        },
        mock_libraryItems,
      ]);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('Should get an array in correct order according to sorting and filtering', async () => {
      // Given
      const args = {
        matching: {
          isBorrowable: true,
        },
        search: 'Izzy',
        orderByData: 'categoryName',
        orderByDirection: 'desc',
      };

      // When
      await service.findAll({
        matching: args.matching,
        search: args.search,
        orderByData: args.orderByData as 'categoryName' | 'type',
        orderByDirection: args.orderByDirection as 'asc' | 'desc',
      });

      // Then
      expect(repository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: {
            _relevance: {
              fields: ['title', 'author', 'type'],
              search: args.search,
              sort: 'desc',
            },
            category: {
              categoryName: 'desc',
            },
          },
          where: {
            isBorrowable: true,
          },
          take: undefined,
          skip: 0,
        }),
      );
    });
  });

  describe('Delete', () => {
    it('Should delete a library and return true or false if was successful', async () => {
      // Given
      const id = mock_book.id;

      // When
      const result = await service.delete(id);

      // Then
      expect(result[0]).toEqual(true);
    });

    it('Should try to delete item with mock id and return false', async () => {
      // Given
      const id = NaN;
      const deleteSpy = jest
        .spyOn(repository, 'deleteItem')
        .mockResolvedValue([undefined, new Error('Error')]);
      // When
      const result = await service.delete(id);

      // Then
      expect(result[0]).toEqual(false);
      expect(deleteSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('Check In/Out', () => {
    it('Should check out an item', async () => {
      // Given
      const item = mock_book;
      const borrower = 'John Doe';
      jest.spyOn(repository, 'checkOutItem').mockResolvedValueOnce([
        {
          ...item,
          borrower,
          isBorrowable: false,
        },
        undefined,
      ]);
      // When
      const result = await service.checkOut(item, borrower);

      // Then
      expect(result[0]).toEqual({
        ...item,
        borrower,
        isBorrowable: false,
      });
    });
  });
});
