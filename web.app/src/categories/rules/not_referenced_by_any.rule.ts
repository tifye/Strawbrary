import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import { CategoriesRepository } from '../categories.repository';

@Injectable()
export class NotReferencedByAnyRule implements PipeTransform {
  constructor(private categoryRepository: CategoriesRepository) {}

  async transform(id: string, _metadata: ArgumentMetadata) {
    const result = await this.categoryRepository.findOne(Number(id));
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    if (result[0]) {
      throw new BadRequestException(
        'Category is referenced by one or more library items.',
      );
    }

    return id;
  }
}
