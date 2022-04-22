import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'OrderDirectionRule' })
@Injectable()
export class OrderDirectionRule implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    if (value !== 'asc' && value !== 'desc') {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid order direction';
  }
}