import { TestingModule, Test } from '@nestjs/testing';
import {
  mock_referenceBook,
  mock_updateReferenceBookDto,
} from '../../__mock-data__/library_items.mock';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';
import { ReferenceBooksService } from './reference_book.service';

const mockRepository = {
  updateItem: jest.fn().mockResolvedValue([1, undefined]),
};

describe('DvdsService', () => {
  let service: ReferenceBooksService;
  let repository: LibraryItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferenceBooksService,
        {
          provide: LibraryItemsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReferenceBooksService>(ReferenceBooksService);
    repository = module.get<LibraryItemsRepository>(LibraryItemsRepository);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Update Reference Book', () => {
    it('Should update a reference book', async () => {
      // Given
      const id = mock_referenceBook.id;
      const updateReferenceBook = JSON.parse(
        JSON.stringify(mock_updateReferenceBookDto),
      );

      // When
      const result = await service.update(id, updateReferenceBook);

      // Then
      expect(result[0]).toEqual(1);
      const calledWith = updateReferenceBook;
      expect(repository.updateItem).toHaveBeenCalledWith(
        id,
        LibraryItemType.ReferenceBook,
        expect.objectContaining(calledWith),
      );
    });

    it('Should return an error for trying to update something that is not a reference book', async () => {
      // Given
      const id = 69;
      const updateReferenceBook = JSON.parse(
        JSON.stringify(mock_updateReferenceBookDto),
      );
      const updateItemSpy = jest
        .spyOn(repository, 'updateItem')
        .mockResolvedValueOnce([0, undefined]);

      // When
      const result = await service.update(id, updateReferenceBook);

      // Then
      expect(result[0]).toEqual(0);
    });
  });
});
