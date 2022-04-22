import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mock_book } from '../../__mock-data__/library_items.mock';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { ItemCanCheckOutRule } from './item_can_check_out.rule';

describe('ItemCanCheckOutRule', () => {
  let rule: ItemCanCheckOutRule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCanCheckOutRule],
    }).compile();

    rule = module.get<ItemCanCheckOutRule>(ItemCanCheckOutRule);
  });

  it('Should throw BadRequestException, item not check out:able', async () => {
    const item = mock_book;
    item.type = LibraryItemType.ReferenceBook;

    await expect(rule.transform(item)).rejects.toThrow(BadRequestException);
  });
});
