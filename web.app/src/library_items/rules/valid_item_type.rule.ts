import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { LibraryItemType } from '../enums/library_item_type.enum';

@ValidatorConstraint({ name: 'ValidItemTypeRule' })
@Injectable()
export class ValidItemTypeRule implements ValidatorConstraintInterface {
  validate(type: string): boolean {
    return Object.values(LibraryItemType).includes(type as LibraryItemType);
  }

  defaultMessage(): string {
    return 'Not a valid library item type';
  }
}
