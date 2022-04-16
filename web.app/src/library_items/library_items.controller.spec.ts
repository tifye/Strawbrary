import { Test, TestingModule } from '@nestjs/testing';
import { LibraryItemsController } from './library_items.controller';

describe('LibraryItemsController', () => {
  let controller: LibraryItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryItemsController],
    }).compile();

    controller = module.get<LibraryItemsController>(LibraryItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
