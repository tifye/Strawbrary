import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateBookDto } from '../dto/create_book.dto';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const result = await this.bookService.create(createBookDto);
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    return result[0];
  }
}
