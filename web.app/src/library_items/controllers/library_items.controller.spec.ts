import { Test, TestingModule } from '@nestjs/testing';
import { LibraryItemsService } from '../services/library_items.service';
import { mock_categories } from '../../__mock-data__/categories.mock';
import { LibraryItemsController } from './library_items.controller';
import { InternalServerErrorException } from '@nestjs/common';
import { mock_book } from '../../__mock-data__/library_items.mock';

describe('LibraryItemsController Unit Tests', () => {
  let libraryItemsController: LibraryItemsController;
  let spyService: LibraryItemsService;

  beforeEach(async () => {
    const spyLibraryItemsService = {
      provide: LibraryItemsService,
      useFactory: () => ({
        findAll: jest.fn(() => mock_categories),
        delete: jest.fn(() => [true, undefined]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryItemsController],
      providers: [LibraryItemsService, spyLibraryItemsService],
    }).compile();

    libraryItemsController = module.get<LibraryItemsController>(
      LibraryItemsController,
    );
    spyService = module.get<LibraryItemsService>(LibraryItemsService);
  });

  describe('findAll', () => {
    it('Should return an array of library items', async () => {
      expect(await libraryItemsController.findAll()).toBe(mock_categories);
      expect(spyService.findAll).toHaveBeenCalled();
    });
  });

  describe('Delete', () => {
    it('Should return true if successful', async () => {
      const id = 1;
      expect(await libraryItemsController.delete(id)).toEqual(true);
      expect(spyService.delete).toHaveBeenCalledWith(id);
    });

    it('Should reject with invalid id', async () => {
      const id = mock_book.id;
      const spyDelete = jest
        .spyOn(spyService, 'delete')
        .mockResolvedValueOnce([false, 'Invalid id']);

      await expect(libraryItemsController.delete(id)).rejects.toEqual(
        new InternalServerErrorException('Invalid id'),
      );
      expect(spyDelete).toHaveBeenCalledWith(id);
    });
  });
});
