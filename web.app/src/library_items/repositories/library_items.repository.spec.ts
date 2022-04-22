import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { LibraryItemType } from '../enums/library_item_type.enum';
import {
  mock_book,
  mock_bookDto,
  mock_libraryItems,
  mock_updateBookDto,
} from '../../__mock-data__/library_items.mock';
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
              updateMany: jest.fn().mockResolvedValue({ count: 1 }),
              delete: jest.fn().mockResolvedValue(mock_book),
              update: jest.fn().mockResolvedValue(mock_book),
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
    expect(prisma).toBeDefined();
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
      expect(result[0]).toEqual(mock_book);
      expect(prisma.libraryItem.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { ...args },
        }),
      );
    });
  });

  describe('Update', () => {
    it('Should update a library item', async () => {
      // Given
      const item = mock_updateBookDto;

      // When
      const result = await repository.updateItem(
        mock_book.id,
        mock_book.type,
        item,
      );

      // Then
      expect(result[0]).toEqual(1);
    });

    describe('Check in/out', () => {
      it('Should check out a library item', async () => {
        // Given
        const id = mock_book.id;
        const borrower = 'John Doe';
        jest.spyOn(prisma.libraryItem, 'update').mockResolvedValueOnce({
          ...mock_book,
          borrower,
          isBorrowable: false,
        });

        // When
        const result = await repository.checkOutItem(id, borrower);

        // Then
        expect(result[0]).toEqual(
          expect.objectContaining({
            ...mock_book,
            borrower,
            isBorrowable: false,
          }),
        );
      });

      it('Should return false when trying to check out item with invalid id', async () => {
        // Given
        const id = NaN;
        const borrower = 'John Doe';
        jest
          .spyOn(prisma.libraryItem, 'update')
          .mockRejectedValueOnce(new Error());

        // When
        const result = await repository.checkOutItem(id, borrower);

        // Then
        expect(result[0]).toBeUndefined();
        expect(result[1]).toEqual(new Error());
      });

      it('Should check in an item', async () => {
        // Given
        const id = mock_book.id;
        jest.spyOn(prisma.libraryItem, 'update').mockResolvedValueOnce({
          ...mock_book,
          borrower: null,
          isBorrowable: true,
        });

        // When
        const result = await repository.checkInItem(id);

        // Then
        expect(result[0]).toEqual(
          expect.objectContaining({
            ...mock_book,
            borrower: null,
            isBorrowable: true,
          }),
        );
      });
    });
  });

  describe('Delete', () => {
    it('Should delete a library item and return which one was delete', async () => {
      // Given
      const id = mock_book.id;

      // When
      const result = await repository.deleteItem(id);

      // Then
      expect(result[0]).toEqual(mock_book);
    });

    it('Should return error if no item was found that matched id', async () => {
      // Given
      const id = NaN;
      const deleteSpy = jest
        .spyOn(prisma.libraryItem, 'delete')
        .mockRejectedValueOnce(new Error('Not found'));
      // When
      const result = await repository.deleteItem(id);

      // Then
      expect(result[1]).toBeInstanceOf(Error);
      expect(result[1].message).toEqual('Not found');
      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
