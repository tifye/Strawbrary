/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
// @ts-ignore
export class MyValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // By pass native types
    if (!metatype || !this.needToValidate(metatype)) {
      return value;
    }

    const object = await plainToClass(metatype, value, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    const errors = await validate(object);
    if (errors.length > 0) {
      console.error(errors);
      throw new BadRequestException('Validation failed');
    }

    return object;
  }

  private needToValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
