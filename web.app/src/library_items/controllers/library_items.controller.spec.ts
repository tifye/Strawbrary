import { Test, TestingModule } from '@nestjs/testing';
import { LibraryItemsService } from '../services/library_items.service';
import { LibraryItemsController } from './library_items.controller';
import { InternalServerErrorException } from '@nestjs/common';
import {
  mock_book,
  mock_libraryItems,
} from '../../__mock-data__/library_items.mock';
import { LibraryItemsRepository } from '../repositories/library_items.repository';
import { ItemCanCheckOutRule } from '../pipes/item_can_check_out.rule';
import { ParseItemPipe } from '../pipes/parse_item.pipe';

const mockRepository = {
  provide: LibraryItemsRepository,
  useValue: {},
};

describe('LibraryItemsController Unit Tests', () => {
  let libraryItemsController: LibraryItemsController;
  let spyService: LibraryItemsService;

  beforeEach(async () => {
    const spyLibraryItemsService = {
      provide: LibraryItemsService,
      useFactory: () => ({
        findAll: jest.fn(() => {
          return [
            {
              page: 1,
              limit: mock_libraryItems.length,
              total: mock_libraryItems.length,
              lastPage: 1,
            },
            mock_libraryItems,
          ];
        }),
        delete: jest.fn(() => [true, undefined]),
        checkOut: jest.fn().mockImplementation((item, borrower) => [
          {
            ...item,
            isBorrowable: false,
            borrower,
          },
          undefined,
        ]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryItemsController],
      providers: [
        LibraryItemsService,
        spyLibraryItemsService,
        mockRepository,
        ParseItemPipe,
        ItemCanCheckOutRule,
      ],
    }).compile();

    libraryItemsController = module.get<LibraryItemsController>(
      LibraryItemsController,
    );
    spyService = module.get<LibraryItemsService>(LibraryItemsService);
  });

  describe('findAll', () => {
    it('Should return an array of library items', async () => {
      const result = await libraryItemsController.findAll();
      expect(result).toEqual({
        page: 1,
        limit: 4,
        total: 4,
        lastPage: 1,
        data: mock_libraryItems,
      });
      expect(spyService.findAll).toHaveBeenCalled();
    });
  });

  describe('Delete', () => {
    it('Should return true if successful', async () => {
      const item = mock_book;
      expect(await libraryItemsController.delete(item)).toEqual(true);
      expect(spyService.delete).toHaveBeenCalledWith(item.id);
    });

    it('Should reject with invalid id', async () => {
      const item = mock_book;
      const spyDelete = jest
        .spyOn(spyService, 'delete')
        .mockResolvedValueOnce([false, 'Invalid id']);

      await expect(libraryItemsController.delete(item)).rejects.toEqual(
        new InternalServerErrorException('Invalid id'),
      );
      expect(spyDelete).toHaveBeenCalledWith(item.id);
    });
  });

  describe('Check In/Out', () => {
    describe('Check Out', () => {
      it('Should check out item and return the updated item', async () => {
        // Given
        const item = mock_book;
        const checkInItemDto = {
          borrower: 'John Doe',
        };

        // When
        const result = await libraryItemsController.checkOut(
          item,
          checkInItemDto,
        );

        // Then
        expect(result).toEqual({
          ...item,
          isBorrowable: false,
          borrower: checkInItemDto.borrower,
        });
      });
    });
  });
});
