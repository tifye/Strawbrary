import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto } from '../dto/create_book.dto';
import { UpdateBookDto } from '../dto/update_book.dto';
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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const result = await this.bookService.update(id, updateBookDto);
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    if (result[0] !== undefined && result[0] == 0) {
      throw new BadRequestException('No book found with given id');
    }

    return {
      wasSuccessful: true,
    };
  }
}
