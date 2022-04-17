import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { LibraryItemsRepository } from '../repositories/library_items.repository';
import { mock_libraryItems } from '../__mock-data__/library_items.mock';
import { LibraryItemsService } from './library_items.service';

const mockRepository = {
  createItem: jest
    .fn()
    .mockImplementation((item: Prisma.LibraryItemCreateInput) =>
      Promise.resolve({ id: 1, ...item }),
    ),
  findAll: jest.fn().mockResolvedValue(mock_libraryItems),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get Items', () => {
    it('Should get an array of library items', async () => {
      await expect(service.findAll()).resolves.toEqual(mock_libraryItems);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });
});
