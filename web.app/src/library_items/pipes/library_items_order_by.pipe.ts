import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LibraryItemsOrderByRule } from '../rules/library_items_order_by.rule';

@Injectable()
export class LibraryItemsOrderByPipe
  extends LibraryItemsOrderByRule
  implements PipeTransform
{
  transform(value: any): any {
    if (super.validate(value)) {
      throw new BadRequestException(
        'Can only order by item type or category name',
      );
    }
    return value;
  }
}
