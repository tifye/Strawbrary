import { Test, TestingModule } from '@nestjs/testing';
import { LibraryItemsService } from '../services/library_items.service';
import { mock_categories } from '../__mock-data__/categories.mock';
import { LibraryItemsController } from './library_items.controller';

describe('LibraryItemsController Unit Tests', () => {
  let libraryItemsController: LibraryItemsController;
  let spyService: LibraryItemsService;

  beforeEach(async () => {
    const spyLibraryItemsService = {
      provide: LibraryItemsService,
      useFactory: () => ({
        findAll: jest.fn(() => mock_categories),
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
});
