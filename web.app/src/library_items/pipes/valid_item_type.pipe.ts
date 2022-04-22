import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ValidItemTypeRule } from '../rules/valid_item_type.rule';

@Injectable()
export class ValidItemTypePipe
  extends ValidItemTypeRule
  implements PipeTransform
{
  async transform(type: string): Promise<string> {
    if (!super.validate(type)) {
      throw new BadRequestException('Invalid item type.');
    }

    return type;
  }
}
