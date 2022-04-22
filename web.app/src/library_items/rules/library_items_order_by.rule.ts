import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'LibraryItemsOrderByRule' })
@Injectable()
export class LibraryItemsOrderByRule implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    if (value !== 'type' && value !== 'categoryName') {
      return false;
    }
    return true;
  }
}
