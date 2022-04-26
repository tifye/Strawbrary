import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'LibraryItemsOrderByRule' })
@Injectable()
export class LibraryItemsOrderByRule implements ValidatorConstraintInterface {
  private acceptedValues = ['type', 'categoryName', 'relevance'];

  validate(value: any): boolean | Promise<boolean> {
    if (!this.acceptedValues.includes(value)) {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // eslint-disable-next-line prettier/prettier
    return `${validationArguments.property} is not a valid order by value. Accepted values are: ${this.acceptedValues.join(', ')}`;
  }
}
