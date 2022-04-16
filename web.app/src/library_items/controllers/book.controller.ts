import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from '../dto/create_book.dto';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.create(createBookDto);
    return book;
  }
}
