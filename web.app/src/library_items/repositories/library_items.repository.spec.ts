import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { LibraryItemType } from '../enums/library_item_type.enum';
import {
  mock_book,
  mock_bookDto,
  mock_libraryItems,
} from '../__mock-data__/library_items.mock';
import { LibraryItemsRepository } from './library_items.repository';

describe('LibraryItemsRepository Unit Tests', () => {
  let repository: LibraryItemsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryItemsRepository,
        {
          provide: PrismaService,
          useFactory: () => ({
            libraryItem: {
              findMany: jest.fn().mockResolvedValue(mock_libraryItems),
              create: jest.fn().mockReturnValue(mock_book),
            },
          }),
        },
      ],
    }).compile();

    repository = module.get<LibraryItemsRepository>(LibraryItemsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Find all', () => {
    it('Should return an array of library items', async () => {
      await expect(repository.findAll()).resolves.toEqual(mock_libraryItems);
    });
  });

  describe('Create', () => {
    it('Should create a new library item', async () => {
      // Given
      const args = {
        ...mock_bookDto,
        isBorrowable: true,
        type: LibraryItemType.Book,
        category: { connect: { id: 1 } },
      };

      // When
      const result = await repository.createItem(args);

      // Then
      expect(result).toEqual(mock_book);
      expect(prisma.libraryItem.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { ...args },
        }),
      );
    });
  });
});
