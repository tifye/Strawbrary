import { Test, TestingModule } from '@nestjs/testing';
import { LibraryItemsService } from '../services/library_items.service';

describe('LibraryItemsService', () => {
  let service: LibraryItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryItemsService],
    }).compile();

    service = module.get<LibraryItemsService>(LibraryItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
