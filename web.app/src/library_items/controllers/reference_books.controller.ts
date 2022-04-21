import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateReferenceBookDto } from '../dto/create_reference_book.dto';
import { ReferenceBooksService } from '../services/reference_book.service';

@Controller('books/reference')
export class ReferenceBooksController {
  constructor(private referenceBooksService: ReferenceBooksService) {}

  @Post()
  async create(@Body() createReferenceBookDto: CreateReferenceBookDto) {
    const result = await this.referenceBooksService.create(
      createReferenceBookDto,
    );
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    return result[0];
  }
}
