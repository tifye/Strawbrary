import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { OrderDirectionRule } from '../.rules/order_direction.rule';

@Injectable()
export class OrderDirectionPipe
  extends OrderDirectionRule
  implements PipeTransform
{
  transform(value: any): any {
    if (super.validate(value)) {
      throw new BadRequestException('Can only order by asc or desc');
    }
    return value;
  }
}
