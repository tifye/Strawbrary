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
  constructor(private categoriesRepository: CategoriesRepository) {}

  async transform(id: string, _metadata: ArgumentMetadata) {
    const result = await this.categoriesRepository.findOne(Number(id));
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    console.log('meep');
    if (result[0]) {
      if ((result[0] as any).libraryItems.length > 0) {
        throw new BadRequestException(
          'Category is referenced by one or more library items.',
        );
      }
    } else {
      throw new BadRequestException('Category does not exist.');
    }

    return id;
  }
}
